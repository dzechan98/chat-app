import { paths } from "@/constants";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const routes = [
  {
    id: 1,
    path: paths.home,
    element: <Home />,
  },
  {
    id: 2,
    path: paths.signin,
    element: <SignIn />,
  },
  {
    id: 3,
    path: paths.signup,
    element: <SignUp />,
  },
];
