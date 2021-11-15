import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyProfil from "./pages/MyProfil";
import About from "./pages/About";
import AdminSettings from "./pages/AdminSettings";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/myProfil" element={<MyProfil />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/admin-settings" element={<AdminSettings />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
