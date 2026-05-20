import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { supabase } from "../supabaseClient.js";

dotenv.config();

// אתחול המודל של גוגל עם המפתח שלך
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeExpense = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "חובה לשלוח טקסט לניתוח" });
  }

  try {
    const { data: buckets, error: bucketsError } = await supabase
      .from("buckets")
      .select("id ,name , category_keywords");

    if (bucketsError) throw bucketsError;

    // 4. מכינים את הרשימה כטקסט קריא ל-AI
    const categoriesText = buckets
      .map(
        (b) =>
          `ID: ${b.id} | Name: ${b.name} | Keywords: ${b.category_keywords}`,
      )
      .join("\n");

    // 5. מגדירים באיזה מודל נשתמש
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 6. כותבים את ההנחיה (ה-Prompt)
    const prompt = `
        You are a smart financial assistant.
        Analyze the following user text: "${text}"
        
        Here are the available budget buckets:
        ${categoriesText}
        
        Your tasks:
        1. Extract the amount spent as a number.
        2. Match the expense to the most appropriate bucket ID based on the text and keywords.
        
        Respond ONLY with a valid JSON object in this exact format, with no markdown or extra text:
        {
          "amount": NUMBER,
          "bucket_id": NUMBER
        }
        `;

    // 7. שולחים את הבקשה ל-AI
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    console.log("AI Response:", aiResponse);
    // נדפיס רק כדי לראות מה הוא החזיר
    // 8. המרת הטקסט שקיבלנו מג'מיני לאובייקט אמיתי
    const parsedData = JSON.parse(aiResponse);
    const { amount, bucket_id } = parsedData;

    // 9. שליפת הסכום הנוכחי של הקופסה הספציפית
    const { data: bucketData, error: fetchError } = await supabase
      .from("buckets")
      .select("current_spending")
      .eq("id", bucket_id)
      .single(); // מחזיר שורה אחת במקום מערך

    if (fetchError) throw fetchError;

    // 10. חישוב הסכום החדש ועדכון במסד הנתונים
    const newSpending = bucketData.current_spending + amount;

    const { data: updatedBucket, error: updateError } = await supabase
      .from("buckets")
      .update({ current_spending: newSpending })
      .eq("id", bucket_id)
      .select();

    if (updateError) throw updateError;
    // 10.5 רישום התנועה בטבלת העסקאות כדי שיהיה לנו יומן
    await supabase.from("transactions").insert([
      {
        bucket_id: bucket_id,
        amount: amount,
        description: text, // הטקסט המקורי שהמשתמש שלח ל-AI
      },
    ]);
    // 11. בדיקה האם חרגנו מהתקציב
    const limit = updatedBucket[0].monthly_budget;
    const current = updatedBucket[0].current_spending;
    let alertMessage = null;

    if (current > limit) {
      const overAmount = current - limit;
      alertMessage = `שים לב! חרגת ב-${overAmount} ש"ח מהתקציב של ${updatedBucket[0].name}`;
    }

    // 12. החזרת תשובה מפורטת ללקוח
    res.status(200).json({
      message: "ההוצאה עודכנה בהצלחה",
      alert: alertMessage, // אם אין חריגה, זה יהיה null
      details: {
        category: updatedBucket[0].name,
        spent_now: amount,
        total_monthly: current,
        budget_limit: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בניתוח ההוצאה: " + err.message });
  }
};
