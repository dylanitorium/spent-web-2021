import { Container } from "components";
import Loading from "pages/Loading";
import { useEffect } from "react";
import { Center, Button } from "ui-components";
import isEmpty from "lodash/isEmpty";

const DashboardComponent = ({ signout, budgets, getBudgets, loading }) => {
  useEffect(() => {
    getBudgets();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isEmpty(budgets)) {
    return (
      <Container>
        <Center>
          <div>
            <p>Let's start by giving the budget a name.</p>
          
          </div>
        </Center>
      </Container>
    );
  }

  return (
    <Container>
      <Center>
        <Button onClick={signout}>Sign out</Button>
      </Center>
    </Container>
  );
};

export default DashboardComponent;
