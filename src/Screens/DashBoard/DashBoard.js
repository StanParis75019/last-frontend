import NavBarAdmin from "../../Components/NavBar/NavBarAdmin";
import Statistics from "./Statistics";

const DashBoard = () => {
  return (
    <div className="DashboardPage bg-gray-100 min-h-screen">
      {/* Barre de navigation de l'administrateur */}
      <NavBarAdmin />
      
      {/* section des statistiques */}
      <Statistics />
    </div>
  );
};

export default DashBoard;
