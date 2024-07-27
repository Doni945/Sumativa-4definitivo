import React, { useEffect, useState } from 'react';

const ActuElimiUsua = () => {
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [editableValues, setEditableValues] = useState({});

  useEffect(() => {
    // Obtener usuarios de la base de datos
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEdit = (user) => {
    // Lógica para modificar el usuario
    setEditableUser(user.id);
    setEditableValues(user);
  };

  const handleSave = (userId) => {
    // Lógica para guardar el usuario modificado
    setEditableUser(null);
    // Aquí puedes enviar los datos actualizados al servidor
  };

  const handleDelete = (userId) => {
    // Lógica para eliminar el usuario
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleChange = (e, field) => {
    setEditableValues({
      ...editableValues,
      [field]: e.target.value,
    });
  };

return (
    <div className="container mx-auto p-4 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <table className="min-w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr className="bg-gray-900">
            <th className="py-2 px-4 border-b border-gray-700">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-700">Email</th>
            <th className="py-2 px-4 border-b border-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="py-2 px-4">
                {editableUser === user.id ? (
                  <input
                    type="text"
                    value={editableValues.username}
                    onChange={(e) => handleChange(e, 'username')}
                    className="border p-1 w-full bg-gray-700 text-white"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="py-2 px-4">
                {editableUser === user.id ? (
                  <input
                    type="text"
                    value={editableValues.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className="border p-1 w-full bg-gray-700 text-white"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  {editableUser === user.id ? (
                    <button
                      onClick={() => handleSave(user.id)}
                      className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900"
                    >
                      Modificar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActuElimiUsua;