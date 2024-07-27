import { useAuth } from '@/components/AuthContext'; 
import { useCart } from '@/components/CartContext'; 
import Layout from '@/components/layout';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const productos = await res.json();

  return { props: { productos } };
}

export default function Home({ productos }) {
  const { isAuthenticated } = useAuth(); 
  const { addToCart, removeFromCart, updateCartItemQuantity, cartItems } = useCart(); 

  const handleQuantityChange = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity);
  };

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto px-4 flex flex-wrap">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold my-8">Catálogo de Productos</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productos.map((producto) => (
                <li key={producto.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-start">
                    <img src={`/juegos/${producto.image}`} alt={producto.name} className="w-full h-auto mb-6 rounded" />
                    <span className="text-xl font-semibold mb-2">Nombre: {producto.name}</span>
                    <span className="text-lg text-gray-700 mb-1">Código de producto: {producto.code}</span>
                    <span className="text-lg mb-1">Categoría: {producto.category}</span>
                    <span className="text-lg text-gray-600 mb-1">Descripción: {producto.description}</span>
                    <span className="text-lg text-gray-600 mb-1">Cantidad: {producto.availability}</span>
                    <span className="text-lg text-gray-500 mb-1">Ubicación: {producto.location}</span>
                    <button 
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                      onClick={() => addToCart(producto)}
                      disabled={producto.availability <= 0}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full lg:w-1/3 h-full bg-gray-200 shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Carrito</h2>
            <ul className="list-disc pl-5">
              {cartItems.map((item) => (
                <li key={item.id} className="text-lg text-gray-800 flex justify-between items-center">
                  {item.name} - Cantidad: 
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                    className="ml-2 w-16 text-center"
                  />
                  <button 
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
