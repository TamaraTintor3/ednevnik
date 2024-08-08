import { createContext, useState, useContext, ReactNode, FC, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import LoginAxiosInstance from "../services/LoginAxios";
import { jwtDecode } from 'jwt-decode'

interface AuthContextType {

  //  user :any;
  userId: any;
  token: any;
  role: any;
  login: any;
  logOut: any;
  isLogedIn: any;
  isTokenExpired: any;
  getRole: any;
  setRole: any;
}



interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const AuthProvider: FC<AuthProviderProps> = ({ children }) => {


  // const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();



  const logOut = () => {
    // setUser(null);
    setToken("");
    setRole("");
    sessionStorage.clear();
    navigate("/login");
  };

  const login = async (username: any, password: any) => {


    try {
      await LoginAxiosInstance.post("/api/authentication/login", { username: username, password: password });
      sessionStorage.setItem("username",username);
      decodeToken();
    } catch (err) {
      alert("Neusjpešna prijava, pokušajte ponovo");
    }


  };

  const getRole = () => {
    const tokken = sessionStorage.getItem("token");
    let rolle = "";
    if (tokken != null) {
      const tok = jwtDecode(tokken);
      const tokenString = JSON.stringify(tok);
      rolle = JSON.parse(tokenString).role;
      setRole(rolle);
      setToken(tokken);
      if (tok.jti)
        setUserId(tok.jti);
    }
    return rolle;
  }

  function isTokenExpired() {

    var current_time = new Date().getTime() / 1000
    const tokken = sessionStorage.getItem("token");
    if (tokken != null) {
      const tok = jwtDecode(tokken);
      if (tok.exp)
        if (current_time > tok.exp) {
          alert("Vaša sesija je istekla, prijavite se ponovo")
          logOut();
          return true;
        }
    }
    return false;


  }



  function isLogedIn() {

    const tokken = sessionStorage.getItem("token");
    getRole();
    if (tokken != null && !isTokenExpired()) {
  
      return true;
    }
    else {
      return false;
      
    }


  }

  function decodeToken() {

    const tokken = sessionStorage.getItem("token");
    if (tokken != null) {
      // setToken(tokken);
    }




  }

  return (
    <AuthContext.Provider value={{ userId, role, token, logOut, login, isTokenExpired, isLogedIn, getRole, setRole }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};