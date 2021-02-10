import { useAuth } from "contexts/auth";
import { Container } from "components";
import { Center, Button, Icon } from "ui-components";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    // I wanna see the loading
    loading && signInWithGoogle();
  }, [loading]);

  return (
    <Container dark>
      <Center column>
        <h1 className="text-indigo-50 text-5xl mb-6">Spent.</h1>
        <Button
          inverse
          onClick={() => {
            setLoading(true);
          }}
          loading={loading}
        >
          <Icon name="SiGoogle" color="rgb(67, 56, 202);" className="mr-2"></Icon> Sign In
        </Button>
      </Center>
    </Container>
  );
};

export default SignIn;
