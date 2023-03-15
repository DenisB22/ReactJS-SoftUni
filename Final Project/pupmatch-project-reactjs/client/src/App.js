import { Routes, Route } from 'react-router-dom';

import { Catalog } from "./components/Catalog/Catalog";
import { CreatePage } from "./components/CreatePage/CreatePage";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-page' element={<CreatePage />} />
          <Route path='/catalog' element={<Catalog />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
