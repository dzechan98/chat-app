/* eslint-disable @typescript-eslint/no-unused-vars */
import { addUser, checkUserExists } from "@/apis";
import { FacebookIcon, GoogleIcon } from "@/components/Icon";
import { auth } from "@/configs/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/interfaces";
import { generateKeywords } from "@/utils";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

type Provider = GoogleAuthProvider | FacebookAuthProvider;

const SignInMethod = () => {
  const { setCurrentUser } = useAuth();

  const handleSignIn = (provider: Provider) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        setCurrentUser(user);
        const check = await checkUserExists(user.uid);
        const dataUser: User = {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          active: true,
          keyword: generateKeywords(user.displayName as string),
        };

        if (!check) {
          await addUser(dataUser);
        }
      })
      .catch((_error) => {});
  };

  const listMethod = [
    {
      id: 1,
      icon: <GoogleIcon />,
      title: "Sign in with Google",
      provider: new GoogleAuthProvider(),
    },
    {
      id: 2,
      icon: <FacebookIcon />,
      title: "Sign in with Facebook",
      provider: new FacebookAuthProvider(),
    },
  ];

  return (
    <div className="center flex-col gap-2">
      {listMethod.map((method) => (
        <div
          key={method.id}
          className="p-2 center gap-2 border border-light-200 text-main-200 w-full rounded-full cursor-pointer"
          onClick={() => handleSignIn(method.provider)}
        >
          <span>{method.icon}</span>
          <span className="font-medium text-sm">{method.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SignInMethod;
