import { Container } from "components";
import BeatLoader from "react-spinners/BeatLoader";
import { Center } from "ui-components";

const Loading = () => {
  return (
    <Container>
      <Center>
        <BeatLoader color={"black"} />
      </Center>
    </Container>
  );
};

export default Loading;
