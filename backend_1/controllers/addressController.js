import { supabase } from '../supabaseClient.js';

export class AddressController {
  static async createAddress(req, res) {
    const { user_id, pincode, country } = req.body;

    if (!user_id || !pincode || !country) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert([{ user_id, pincode, country }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Address saved successfully', data });
  }
  static async getAddressesByUser(req, res) {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}

}
