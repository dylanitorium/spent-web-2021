import { Container } from "components";
import { useAuth } from "contexts/auth";
import { useModel } from "contexts/model";
import { Loading } from "pages";
import { useEffect, useMemo, useState } from "react";
import { Button } from "ui-components";
import { OnboardStepTracker } from "./components";
import { Create, Import } from "./steps";

const Share = () => {
  return <div />;
};

const Onboard = () => {
  const [budget, setBudget] = useState();
  const [loading, setLoading] = useState(true);

  const { budgets } = useModel();
  const { signout } = useAuth();

  useEffect(() => {
    const promise = budgets?.subscribe({
      onSnapshot: async (snapshot) => {
        if (budgets && !budget) {
          setBudget(snapshot && snapshot[0]);
        }
        setLoading(false);
      },
    });

    return () => void promise?.then((unsub) => unsub && unsub());
  }, []);


  const step = useMemo(() => {
    if (!budget) return 0;
    return 1;
  }, [budget]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div style={{ width: "600px" }} className="bg-indigo-900 p-4">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-indigo-50 text-5xl">Spent.</h1>
          <Button invisible onClick={signout}>
            Sign out
          </Button>
        </div>
        <div className="p-4">
          <OnboardStepTracker activeStep={step} />
        </div>
      </div>
      <div className="flex-1">
        <div className="pt-36 pl-20 w-9/12">
          {step === 0 && <Create />}
          {step === 1 && <Import budget={budget} />}
          {/*{step === 2 && <Share />}*/}
        </div>
      </div>
    </Container>
  );
};

export default Onboard;
