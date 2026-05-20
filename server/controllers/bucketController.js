import { supabase } from "../supabaseClient.js";

//CRUD

//READ

export const getB = async (req, res) => {
  try {
    const { data, error } = await supabase.from("buckets").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "no good" + err.message });
  }
};

//CREATE
export const creatB = async (req, res) => {
  const { name, monthly_budget, current_spending, category_keywords } =
    req.body;
  if (!name || !monthly_budget)
    return res.status(400).json({ error: "חובה לשים שם וסכום" });
  try {
    const { data, error } = await supabase
      .from("buckets")
      .insert([
        { name, monthly_budget, current_spending: 0, category_keywords },
      ])
      .select();

    if (error) throw error;
    res.status(200).json({ message: "הקופסה נוצרה ", bucket: data[0] });
  } catch (err) {
    res.status(500).json({ error: "no good" + err.message });
  }
};

//UPDATE
export const putB = async (req, res) => {
  const id = req.params.id;

  const { current_spending } = req.body;

  try {
    const { data, error } = await supabase
      .from("buckets")
      .update({ current_spending })
      .eq("id", id)
      .select();
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "update failed " + err.message });
  }
};

//DELETE
export const deleteB = async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("buckets")
      .delete()
      .eq("id", id)
      .select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "delete failed" + err.message });
  }
};
