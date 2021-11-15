import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyProfil from "./pages/MyProfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/myProfil" element={<MyProfil />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
