import { FC, ReactNode, createContext, useState } from "react";

interface SchoolYearContextType {

    schoolYearId: any;
  }
  
  
  
  interface SchoolYearProviderProps {
    children: ReactNode;
  }
  
  const SchoolYearContext = createContext<SchoolYearContextType | undefined>(undefined);
  
  
  const SchoolYearProvider: FC<SchoolYearProviderProps> = ({ children }) => {
  
  
    const [schoolYearId, setScholYearId] = useState(0)

  
    return (
      <SchoolYearContext.Provider value={{ schoolYearId }}>
        {children}
      </SchoolYearContext.Provider>
    );
  
  };
  
  export default {SchoolYearProvider, SchoolYearContext};