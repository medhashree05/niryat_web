// backend/controllers/enquiryController.js
const { supabase } = require('../supabaseClient');

async function createEnquiry(req, res) {
  const { userId, productId, message } = req.body;

  if (!userId || !productId || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{ user_id: userId, product_id: productId, message }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to create enquiry' });
    }

    return res.status(201).json({ message: 'Enquiry submitted', enquiry: data[0] });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
async function getEnquiriesByUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch enquiries' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createEnquiry, getEnquiriesByUser };


