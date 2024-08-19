import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { getProfessorByUserId } from "../services/UserApi";

interface ProfessorContextType {

   
    professorId:any;
    setProfId:any;
    classProfessor:any;
    setClassProfessor:any;
  }


  interface ProfessorProviderProps {
  children: ReactNode;
}

const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);

const ProfessorProvider: FC<ProfessorProviderProps> = ({ children }) => {

    const context = useAuth();

    const [professorId,setProfessorId] = useState();
    const [classProfessor,setClassProfessor]=useState();

    function setProfId(id:number){


        getProfessorByUserId(id).then(resp => {
            console.log(resp.data.professorId);
            setProfessorId(resp.data.professorId)
            setClassProfessor(resp.data.classProfessor);
          });    
    
      }

     

    return (
        <ProfessorContext.Provider value={{ professorId, setProfId, classProfessor, setClassProfessor}}>
          {children}
        </ProfessorContext.Provider>
      );
};


export default ProfessorProvider;

export const useProfessorContext = () => {
    return useContext(ProfessorContext);
  };