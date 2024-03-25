import { routes } from "@/routes";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
