import { useCustomYup } from "@/hooks";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { NotFound } from "@/pages/NotFound";
import { privateRoutes, publicRoutes } from "@/routes";
import { Route, Routes } from "react-router-dom";

function App() {
  useCustomYup();

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {privateRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
      {publicRoutes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
