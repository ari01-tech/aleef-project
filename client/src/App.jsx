import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Pages (بننشئها بعد شوي)
import About from "./Pages/About";
import AddPet from "./Pages/AddPet";
import Adoption from "./Pages/Adoption";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Lost from "./Pages/Lost";
import PetDetails from "./Pages/PetDetails";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import ReportLostPet from "./Pages/ReportLostPet";
import EditPet from "./Pages/EditPet";
import EditLostPet from "./Pages/EditLostPet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/report-lost-pet" element={<ReportLostPet />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
<Route path="/edit-lost/:id" element={<EditLostPet />} />
      </Routes>
    </Router>
  );
}

export default App;