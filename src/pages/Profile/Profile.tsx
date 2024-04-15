import { Info, InfoUserAccordion } from "@/components/InfoUserChat";
import { Title } from "@/components/Title";
import { useAuth } from "@/contexts";
import { useFetchUserById, useTitle } from "@/hooks";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants";
import { LoadingLogo } from "@/components/Loading";

const Profile = () => {
  useTitle("Profile");
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { loading, infoUser } = useFetchUserById(currentUser?.uid as string);

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
          <div className="px-6 flex items-center justify-between">
            <Title className="text-xl text-main-100">My profile</Title>
            <Button onClick={() => navigate(paths.updateProfile)}>
              Update profile
            </Button>
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
