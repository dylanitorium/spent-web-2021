import { useAuth } from "contexts/auth";
import { Container } from "components";
import { Center, Button } from "ui-components";

const SignIn = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <Container>
      <Center column>
        <Button onClick={signInWithGoogle}>Sign In</Button>
      </Center>
    </Container>
  );
};

export default SignIn;
