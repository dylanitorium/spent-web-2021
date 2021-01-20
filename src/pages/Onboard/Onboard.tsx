import { Container } from "components";
import { useModel } from "contexts/model";
import { Loading } from "pages";
import { useEffect, useMemo, useState } from "react";
import { Center } from "ui-components";
import { OnboardStepTracker } from "./components";
import { Create, Import } from "./steps";

const Share = () => {
  return <div />;
};

const Onboard = () => {
  const [budget, setBudget] = useState();
  const [loading, setLoading] = useState(true);

  const { budgets } = useModel();

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
      <Center>
        <div className="flex items-center">
          <div className="mr-12">
            <OnboardStepTracker activeStep={step} />
          </div>
          <div className="w-96">
            {step === 0 && <Create />}
            {step === 1 && <Import budget={budget} />}
            {/*{step === 2 && <Share />}*/}
          </div>
        </div>
      </Center>
    </Container>
  );
};

export default Onboard;
