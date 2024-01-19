import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./Context/AppContext";
import { RouterRoutes } from "./routes/router-routes";
import "./styles/custom/custom-pagination-antd.css";
function App() {
  return (
    <div className="App">
      <Routes>
        {RouterRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.url}
            element={<AppProvider>{route.page}</AppProvider>}
          ></Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
