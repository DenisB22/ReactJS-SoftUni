import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { gameServiceFactory } from "./services/gameService";

import { AuthProvider } from "./components/contexts/AuthContext";
import { useService } from "./components/hooks/useService";

import { Catalog } from "./components/Catalog/Catalog";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { GameDetails } from "./components/GameDetails/GameDetails";
import { Logout } from "./components/Logout/Logout";
import { EditGame } from "./components/EditGame/EditGame";
import { RouteGuard } from "./components/common/RouteGuard";
// import { withAuth } from "./hoc/withAuth";

function App() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const gameService = gameServiceFactory(); //auth.accessToken

  useEffect(() => {
    gameService.getAll().then((result) => {
      setGames(result);
    });
  }, []);

  const onCreateGameSubmit = async (data) => {
    const newGame = await gameService.create(data);

    // TODO: add to state
    setGames((state) => [...state, newGame]);

    // TODO: redirect to catalog
    navigate("/catalog");
  };

  const onGameEditSubmit = async (values) => {
    const result = await gameService.edit(values._id, values);

    // TODO: change state!!!
    setGames((state) => state.map((x) => (x._id === values._id ? result : x)));

    navigate(`/catalog/${values._id}`);
  };

  // const EnhancedLogin = withAuth(Login);

  return (
    <AuthProvider>
      <div id="box">
        <Header />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route
              path="/login"
              element={<Login onLoginSubmit={onLoginSubmit} />}
            /> */}
            <Route
              path="/login"
              // element={<EnhancedLogin />}
              element={<Login />}
            />
            <Route path="/register" element={<Register />} />
            
            <Route path="/catalog" element={<Catalog games={games} />} />
            <Route path="/catalog/:gameId" element={<GameDetails />} />

            <Route element={<RouteGuard  />}>
              <Route
                path="/catalog/:gameId/edit"
                element={<EditGame onGameEditSubmit={onGameEditSubmit} />}
              />
              <Route path="/create-game" element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            {/* <Route
              path="/create-game"
              element={
                <RouteGuard>
                  <CreateGame onCreateGameSubmit={onCreateGameSubmit} />
                </RouteGuard>
              }
            /> */}
              
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
