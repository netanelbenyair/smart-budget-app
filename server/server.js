import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabaseClient.js";
import goalRoutes from "./routes/goalRoutes.js";
import bucketRoutes from "./routes/bucketRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// טעינת משתני הסביבה
dotenv.config();

const app = express();
// השרת יחפש את הפורט בקובץ ה-.env, ואם לא ימצא ייקח את 4000
const port = process.env.PORT || 4000;

// הגדרות אבטחה ופענוח נתונים
app.use(cors());
app.use(express.json());

app.use("/api/goals", goalRoutes);
app.use("/api/buckets", bucketRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/transactions", transactionRoutes);

console.log("Attempting to start server with port:", port);
// הפעלת השרת
app
  .listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err.message);
  });

// // נתיב בדיקה בסיסי
// app.get('/api/goals', async(req, res) => {
//     try{
//  const {data , error} = await supabase.from('goals').select('*')
// if(error) throw error;
// res.status(200).json(data)
//     }catch(err){
//           res.status(500).json({error:'no good' +err.message })
//     }
// });

// app.post('/api/goals' , async(req ,res)=>{
//     const {name ,target_amount ,user_id} = req.body;

//     if(!name || !target_amount){
//         return res.status(400).json({error:'חובה לשים יעד וסכום'})
//     }

//     try{
//         const {data ,error} = await supabase.from('goals').insert([{name ,target_amount , current_amount:0, user_id}]).select();

//         if(error) throw error;

//         res.status(201).json({message:"היעד נוצר בהצלחה" , goal: data[0]});
//     }catch(err){
//         res.status(500).json({error:'no good' +err.message })
//     }

// });

// app.put('/api/goals/:id' , async(req , res)=>{
// const id = req.params.id;

// const {current_amount} =req.body;

// try{
//     const {data , error} = await supabase.from('goals').update({current_amount}).eq('id' ,id).select();

//     if (error) throw error;
//     res.status(200).json(data[0]);
// }catch(err){
// res.status(500).json({error:"update failed"+err.message})
// }
// });

// app.delete('/api/goals/:id' , async(req ,res) => {
//     const id = req.params.id;
//     try{
// const {data ,error} = await supabase.from('goals').delete().eq('id' ,id).select();
// if (error) throw error;
// res.status(200).json(data);
//     }catch(err){
// res.status(500).json({error:"delete failed" +err.message})
//     }
// })
