import React, { useEffect, useState } from 'react';

const ActuElimiProduc = () => {
  const [products, setProducts] = useState([]);
  const [editableProduct, setEditableProduct] = useState(null);
  const [editableValues, setEditableValues] = useState({});

  useEffect(() => {
    // Obtener productos de la base de datos
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleEdit = (product) => {
    // Lógica para modificar el producto
    setEditableProduct(product.id);
    setEditableValues(product);
  };

  const handleSave = async (productId) => {
    // Lógica para guardar el producto modificado
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editableValues),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );
      setEditableProduct(null);
    } else {
      console.error('Error updating product:', response.statusText);
    }
  };

  const handleDelete = (productId) => {
    // Lógica para eliminar el producto
    fetch(`/api/products/${productId}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleChange = (e, field) => {
    setEditableValues({
      ...editableValues,
      [field]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="p-4 border rounded shadow-sm">
            <div className="mb-2">
              <span className="font-semibold">Nombre: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.name}
                  onChange={(e) => handleChange(e, 'name')}
                  className="border p-1"
                />
              ) : (
                product.name
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Categoría: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.category}
                  onChange={(e) => handleChange(e, 'category')}
                  className="border p-1"
                />
              ) : (
                product.category
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Descripción: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.description}
                  onChange={(e) => handleChange(e, 'description')}
                  className="border p-1"
                />
              ) : (
                product.description
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Ubicación: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.location}
                  onChange={(e) => handleChange(e, 'location')}
                  className="border p-1"
                />
              ) : (
                product.location
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Imagen: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.image}
                  onChange={(e) => handleChange(e, 'image')}
                  className="border p-1"
                />
              ) : (
                product.image
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Disponibilidad: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.availability}
                  onChange={(e) => handleChange(e, 'availability')}
                  className="border p-1"
                />
              ) : (
                product.availability
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Timebox: </span>
              {editableProduct === product.id ? (
                <input
                  type="text"
                  value={editableValues.timebox}
                  onChange={(e) => handleChange(e, 'timebox')}
                  className="border p-1"
                />
              ) : (
                product.timebox
              )}
            </div>
            <div className="flex space-x-2">
              {editableProduct === product.id ? (
                <button
                  onClick={() => handleSave(product.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Modificar
                </button>
              )}
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActuElimiProduc;