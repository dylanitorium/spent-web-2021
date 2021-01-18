import { Container } from "components";
import { useAuth } from "contexts/auth";
import { Center, Button } from "ui-components";




interface DashboardProps {
  growLogs?: any[];
}

const Dashboard = ({ growLogs = [] }: DashboardProps) => {
  const { signout } = useAuth();
  return (
    <Container>
      <Center>
        <Button onClick={signout}>Sign out</Button>
      </Center>
    </Container>
  );
};

export default Dashboard;
