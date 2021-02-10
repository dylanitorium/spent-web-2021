import { Container } from "components";
import BeatLoader from "react-spinners/BeatLoader";
import { Center } from "ui-components";

const Loading = () => {
  return (
    <Container dark>
      <Center>
        <BeatLoader color={"#EEF2FF"} />
      </Center>
    </Container>
  );
};

export default Loading;
