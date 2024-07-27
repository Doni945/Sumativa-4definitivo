import { openDb } from '../../../db';

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      if (user) {
        // Aquí deberías generar un token o alguna forma de sesión para el usuario
        res.status(200).json({ message: 'Login successful', user: user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Manejo de otros métodos HTTP si es necesario
    res.status(405).json({ message: 'Method not allowed' });
  }
}