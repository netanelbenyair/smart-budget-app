import { supabase } from "../supabaseClient.js";

export const getTransactions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בשליפת עסקאות: " + err.message });
  }
};
