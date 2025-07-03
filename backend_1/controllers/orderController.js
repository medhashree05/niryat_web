// controllers/orderController.js
import { supabase } from '../supabaseClient.js';

export class OrderController {
  // Get all orders for a user 
  static async getOrdersByUser(req, res) {
    const userId = req.params.userId;

    try {
      // Get orders for user
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (ordersError) throw ordersError;

      // For each order, get its items and then fetch product details
      const ordersWithItems = await Promise.all(
        orders.map(async order => {
          // First get order items
          const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('id, product_id, quantity, price')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          // Then fetch product details for each item
          const itemsWithProductDetails = await Promise.all(
            items.map(async item => {
              const { data: product, error: productError } = await supabase
                .from('products')
                .select('title, image, description')
                .eq('id', item.product_id)
                .single();

              if (productError) {
                console.error(`Error fetching product ${item.product_id}:`, productError);
              }

              return {
                ...item,
                name: product?.title || 'Unknown Product',
                image: product?.image || null,
                description: product?.description || null
              };
            })
          );

          return { ...order, items: itemsWithProductDetails };
        })
      );

      res.status(200).json({ orders: ordersWithItems });
    } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ message: err.message || 'Error fetching orders' });
    }
  }

  static async placeOrder(req, res) {
    const { user_id, products } = req.body;

    try {
      if (!user_id || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Invalid order data' });
      }

      // Calculate total price
      let total = 0;
      for (const p of products) {
        if (!p.id || !p.quantity || !p.price) {
          return res.status(400).json({ message: 'Product data incomplete' });
        }
        total += p.price * p.quantity;
      }

      // Insert order header
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id,
            status: 'Placed',
            total,
            date: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // Prepare order items data
      const itemsToInsert = products.map(p => ({
        order_id: orderId,
        product_id: p.id,
        quantity: p.quantity,
        price: p.price
      }));

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      res.status(201).json({ 
        message: 'Order placed successfully', 
        order: orderData, 
        items: itemsData 
      });
    } catch (err) {
      console.error('Error placing order:', err);
      res.status(500).json({ message: err.message || 'Error placing order' });
    }
  }
}