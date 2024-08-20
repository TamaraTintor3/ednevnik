import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { getProfessorByUserId } from "../services/UserApi";

interface ProfessorContextType {

   
    professorId:any;
    setProfId:any;
  }


  interface ProfessorProviderProps {
  children: ReactNode;
}

const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);

const ProfessorProvider: FC<ProfessorProviderProps> = ({ children }) => {

    const context = useAuth();

    const [professorId,setProfessorId] = useState();

    function setProfId(id:number){


        getProfessorByUserId(id).then(resp => {
            console.log(resp.data.professorId);
            setProfessorId(resp.data.professorId)
          });    
    
      }

     

    return (
        <ProfessorContext.Provider value={{ professorId, setProfId}}>
          {children}
        </ProfessorContext.Provider>
      );
};


export default ProfessorProvider;

export const useProfessorContext = () => {
    return useContext(ProfessorContext);
  };