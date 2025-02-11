const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base-content text-sm">
          © {new Date().getFullYear()} Mi Aplicación. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
