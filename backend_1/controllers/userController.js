// controllers/userController.js
import { supabase } from '../supabaseClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export class UserController {
  // Register a new user
  static async register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email, id, name')
        .eq('email', email)
        .single();

      if (existingUser)
        return res.status(400).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user and return inserted user with .select()
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([{ name, email, password: hashedPassword }])
        .select();

      if (insertError) throw insertError;

      const newUser = insertData[0];

      // Create JWT token
      const token = jwt.sign(
        { id: newUser.id, name: newUser.name, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(201).json({ user: newUser, token });
    } catch (err) {
      console.error('Backend register error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }

  // Login existing user
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user)
        return res.status(401).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      // Remove password field before sending user data
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        message: 'Login successful',
        token,
        user: userWithoutPassword,
      });
    } catch (err) {
      console.error('Backend login error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }

  // Update user profile (name, email)
  static async updateProfile(req, res) {
    const userId = req.user.id; // from auth middleware
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    try {
      // Check if email is used by another user
      const { data: existingUser, error: emailError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .neq('id', userId)
        .single();

      if (emailError === null && existingUser) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }

      const { data, error } = await supabase
        .from('users')
        .update({ name, email })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      // Exclude password before sending response
      const { password: _, ...updatedUser } = data;

      res.json({ success: true, message: 'Profile updated', user: updatedUser });
    } catch (err) {
      console.error('Update profile error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // Change user password
  static async changePassword(req, res) {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new passwords are required' });
    }

    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('password')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const { error: updateError } = await supabase
        .from('users')
        .update({ password: hashedNewPassword })
        .eq('id', userId);

      if (updateError) throw updateError;

      res.json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
      console.error('Change password error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}
