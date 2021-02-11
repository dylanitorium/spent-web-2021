import { Container } from "components";
import Loading from "pages/Loading";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Center, Button } from "ui-components";
import isEmpty from "lodash/isEmpty";
import { useGetCollection } from "db";
import { useAuth } from "contexts/auth";

const Dashboard = () => {
  const [budgets, getBudgets, loading] = useGetCollection("budgets");
  const { signout, user } = useAuth();

  useEffect(() => {
    getBudgets();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user.onboarded) {
    return <Redirect to="/onboard" />;
  }

  return (
    <Container>
      <Center>
        <Button onClick={signout}>Sign out</Button>
      </Center>
    </Container>
  );
};

export default Dashboard;
