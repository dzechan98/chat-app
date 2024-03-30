import { paths } from "@/constants";
import { Chat } from "@/pages/Chat";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";

export const privateRoutes = [
  {
    id: 1,
    path: paths.home,
    element: <Home />,
  },
  { id: 2, path: paths.chat, element: <Chat /> },
  { id: 3, path: `${paths.chat}/:roomId`, element: <Chat /> },
];

export const publicRoutes = [
  {
    id: 1,
    path: paths.signin,
    element: <SignIn />,
  },
  {
    id: 2,
    path: paths.signup,
    element: <SignUp />,
  },
];
