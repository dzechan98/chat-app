import { Info, InfoUserAccordion } from "@/components/InfoUserChat";
import { Title } from "@/components/Title";
import { useAuth } from "@/contexts";
import { useFetchUserById, useTitle } from "@/hooks";
import { FaRegUser } from "react-icons/fa";

import { LoadingLogo } from "@/components/Loading";

const Profile = () => {
  useTitle("Profile");
  const { currentUser } = useAuth();
  const { loading, infoUser } = useFetchUserById(currentUser?.uid);

  const menuInfoAccordion = [
    {
      title: "About",
      icon: <FaRegUser />,
      children: <InfoUserAccordion {...infoUser} />,
    },
  ];

  return (
    <div className="w-full h-full">
      {loading && <LoadingLogo />}
      {!loading && (
        <>
          <div className="px-6 flex items-center">
            <Title className="text-xl text-main-100">My profile</Title>
          </div>
          <Info
            photoURL={infoUser.photoURL as string}
            active={infoUser.active}
            displayName={infoUser.displayName as string}
            menuInfoAccordion={menuInfoAccordion}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
