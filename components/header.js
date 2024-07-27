import React, { useState } from 'react';
export default function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso', data);
      setIsAuthenticated(true);
      setUserDisplayName(username); 
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDisplayName('');
    // Aquí puedes limpiar también el token de sesión o realizar otras acciones de limpieza
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">INACAPLudi</h1>
      {isAuthenticated ? (
        <div className="flex items-center">
          <span className="mr-4">Hola, {userDisplayName}</span>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="flex items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de Usuario"
            className="m-2 text-black"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="m-2 text-black"
            required
          />
          <button type="submit" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Iniciar Sesión
          </button>
        </form>
      )}
    </header>
  );
}