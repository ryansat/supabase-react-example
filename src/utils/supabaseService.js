// utils/supabaseService.js

import { supabase } from './supabaseClient';

export const getTodos = async () => {
  let { data, error } = await supabase.from('todos').select('*');
  if (error) console.error('Error fetching data: ', error);
  else return data;
};

export const createTodo = async (task) => {
  let { data, error } = await supabase
    .from('todos')
    .insert([{ task, is_complete: false }]);
  if (error) console.error('Error inserting data: ', error);
  else return data;
};

export const updateTodo = async (id, is_complete) => {
  let { data, error } = await supabase
    .from('todos')
    .update({ is_complete })
    .eq('id', id);
  if (error) console.error('Error updating data: ', error);
  else return data;
};

export const deleteTodo = async (id) => {
  let { data, error } = await supabase.from('todos').delete().eq('id', id);
  if (error) console.error('Error deleting data: ', error);
  else return data;
};
