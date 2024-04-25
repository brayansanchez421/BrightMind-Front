import logo from '../../assets/img/hola.png'; 

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto animate-bounce" src={logo} alt="Logo" /> 
          <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">Ooops! Página no encontrada</h2> 
          <p className="mt-2 text-center text-sm text-gray-600">
            La página que estás buscando no existe. ¿Quieres volver a la página de inicio?
          </p>
        </div>
        <div className="text-center">
          <a href="/" className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"> 
            Volver a la página de inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
