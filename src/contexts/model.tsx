import { useAuth } from "contexts/auth";
import { Budgets, Imports } from "models";
import { createContext, useContext } from "react";

const modelContext = createContext({});

interface ModelContext { budgets?: Budgets, imports?: Imports }

export const useModel: () => ModelContext = () => useContext(modelContext);

export const ModelProvider = ({ children }) => {
  const { user } = useAuth();
  return (
    <modelContext.Provider value={{ budgets: new Budgets(user), imports: new Imports(user) }}>
      {children}
    </modelContext.Provider>
  );
};
