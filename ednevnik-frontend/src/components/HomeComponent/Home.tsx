import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthenticationContext";

const HomeComponent = () => {
  const authentication = useAuth();

  useEffect(() => {
    if (authentication) {
      // alert(authentication.getRole());
      // alert("222" + authentication.role);
    }
  }, []);

  return <label>Home</label>;
};

export default HomeComponent;
