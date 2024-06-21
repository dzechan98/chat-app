import { Button } from "@/components/Button";
import { paths } from "@/constants";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Size } from "@/interfaces";
import { Title } from "@/components/Title";
import { useAuth } from "@/contexts";

const NotFound = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="bg-main-400 w-screen h-screen py-10">
      <div className="container h-full relative">
        <div className="absolute top-0 left-0">
          <Button onClick={() => navigate(-1)} intent="text" size={Size.large}>
            <span className="mr-2">
              <AiOutlineArrowLeft />
            </span>
            <span>Go Back</span>
          </Button>
        </div>
        <div className="h-full center flex-col gap-1 text-main-200">
          <div className="text-[120px] text-primary text-shadow-lg">404</div>
          <h2 className="font-bold text-4xl -mt-10">Not Found</h2>
          <Title className="font-semibold text-xl ">
            Sorry, we are unable to find that page
          </Title>
          <p className="font-medium text-lg mb-4">
            Please use main or choose from category below
          </p>
          <Button
            size={Size.large}
            intent="outline"
            onClick={() => navigate(currentUser ? paths.chat : paths.signin)}
          >
            <span>Go to home</span>
            <span className="ml-2">
              <AiOutlineArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
