import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/juegos/nova.jpg')" }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
