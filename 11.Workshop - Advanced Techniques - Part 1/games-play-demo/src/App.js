import { Routes, Route} from "react-router-dom";

import { AuthProvider } from "./components/contexts/AuthContext";
import { GameProvider } from "./components/contexts/GameContext";

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
import { GameOwner } from "./components/common/GameOwner";
// import { withAuth } from "./hoc/withAuth";

function App() {

  // const EnhancedLogin = withAuth(Login);

  return (
    <AuthProvider>
      <GameProvider>
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
            
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:gameId" element={<GameDetails />} />

            <Route element={<RouteGuard  />}>
              <Route
                path="/catalog/:gameId/edit"
                element={
                  <GameOwner>
                    <EditGame />
                  </GameOwner>
              }
              />
              <Route path="/create-game" element={<CreateGame />} />
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
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
