import { supabase } from '../supabaseClient.js';

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, description, category,image');

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
   static async getProductById(req, res) {
    const { id } = req.params;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, description,category, image')
        .eq('id', id)
        .single();

      if (error) return res.status(404).json({ error: 'Product not found' });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
