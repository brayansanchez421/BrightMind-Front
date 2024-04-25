import Cards from '../components/Dashboard/Cards';
import LeftBar from '../components/Dashboard/LeftBar';
import Navbar from '../components/Dashboard/NavBar';


function Dashboard() {
  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 ">
    <div className="flex h-screen overflow-hidden"> {/* Asegúrate de que no haya scroll innecesario */}
      {/* Sidebar */}
      <LeftBar />
      {/* Contenido principal */}
      <div className="flex-1 bg-gray-200"> {/* Se removió p-4 para quitar el padding */}
        {/* Navbar */}
        <Navbar />
        {/* Contenido del dashboard */}
        <div className="  mt-10"> {/* Ajusta el margen superior si es necesario */}
          {/* Estadísticas */}
          <Cards />
        
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
