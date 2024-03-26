import { RequireAuth } from "@/components/RequireAuth";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { privateRoutes, publicRoutes } from "@/routes";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
      >
        {privateRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
      {publicRoutes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
