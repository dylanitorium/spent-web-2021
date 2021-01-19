import { Container } from "components";
import { Field, Form } from "components/form";
import { useAuth } from "contexts/auth";
import { useCreateDoc, useSubscribeToCollection } from "db";
import { Loading } from "pages";
import { useEffect, useMemo, useState } from "react";
import { Center, Button } from "ui-components";
import { OnboardStepTracker } from "./components";



const Create = () => {
  const { user } = useAuth();
  const [createBudget, loading] = useCreateDoc("budgets", "budget_id");
  const [name, setName] = useState();

  const handleCreateBudget = async () => {
    await createBudget({ name, user_id: user.user_id });
  };

  return (
    <Form onSubmit={handleCreateBudget}>
      <div className="mb-3">
        <Field
          name="name"
          label="Budget Name"
          onChange={({ value }) => setName(value)}
        />
      </div>
      <Button loading={loading}>Next</Button>
    </Form>
  );
};

const Share = ({ budget }) => {
  return <div>Share {budget.name} {budget.budget_id}</div>;
};

const Import = () => {
  return <div />;
};

const Onboard = () => {
  const [budget, setBudget] = useState();
  const [budgets, subscribeToBudgets, loading] = useSubscribeToCollection(
    "budgets"
  );

  useEffect(() => {
    const unsubscribe = subscribeToBudgets();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setBudget(budgets[0]);
  }, [budgets]);

  const step = useMemo(() => {
    if (!budget) return 0;
    return 1;
  }, [budget]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Center>
        <div className="flex items-center">
          <div className="mr-6">
            <OnboardStepTracker activeStep={step} />
          </div>
          <div>
            {step === 0 && <Create />}
            {step === 1 && <Share budget={budget} />}
            {/*{step === 2 && <Import />}*/}
          </div>
        </div>
      </Center>
    </Container>
  );
};

export default Onboard;
