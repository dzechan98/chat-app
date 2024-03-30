import { Logo } from "@/components/Logo";

const LoadingLogo = () => {
  return (
    <div className="w-full h-full center flex-col">
      <Logo logoString={false} />
    </div>
  );
};

export default LoadingLogo;
