import { useAuth } from "contexts/auth";
import { useGetCollection } from "db";
import DashboardComponent from "./Dashboard.Component";

const Dashboard = () => {
  const [budgets, getBudgets, loading] = useGetCollection("budgets");
  const { signout } = useAuth();

  return (
    <DashboardComponent
      budgets={budgets}
      getBudgets={getBudgets}
      loading={loading}
      signout={signout}
    />
  );
};

export default Dashboard;
