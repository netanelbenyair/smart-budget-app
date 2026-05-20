import { supabase } from "../supabaseClient.js";
// כל פונקציות הCRUD
//READ
export const getGoals = async (req, res) => {
  try {
    const { data, error } = await supabase.from("goals").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "no good" + err.message });
  }
};
//CREATE
export const createGoals = async (req, res) => {
  const { name, target_amount, user_id } = req.body;
  if (!name || !target_amount) {
    return res.status(400).json({ error: "חובה לשים יעד וסכום" });
  }
  try {
    const { data, error } = await supabase
      .from("goals")
      .insert([{ name, target_amount, current_amount: 0, user_id }])
      .select();
    if (error) throw error;

    res.status(201).json({ message: "היעד נוצר בהצלחה", goal: data[0] });
  } catch (err) {
    res.status(500).json({ error: "no good" + err.message });
  }
};

//UPDATE
export const putGoals = async (req, res) => {
  const id = req.params.id;

  const { current_amount } = req.body;

  try {
    const { data, error } = await supabase
      .from("goals")
      .update({ current_amount })
      .eq("id", id)
      .select();
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "update failed " + err.message });
  }
};

//DELETE

export const deleteGoals = async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("goals")
      .delete()
      .eq("id ", id)
      .select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "delete failed" + err.message });
  }
};
