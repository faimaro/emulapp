import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-base-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary">Mi Aplicación</h1>
            </div>
            <div className="ml-6 flex space-x-8">
              <Link to="/" className="text-base-content hover:text-primary">
                Home
              </Link>
              <Link
                to="/menu/1"
                className="text-base-content hover:text-primary"
              >
                Branch Menu
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-base-content hover:text-primary hover:bg-base-200"
              aria-label="Abrir menú principal"
              title="Abrir menú principal"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
