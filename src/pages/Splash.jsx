import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>Splash UI</div>;
};

export default SplashScreen;
