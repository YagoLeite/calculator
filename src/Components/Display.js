import { Box, Text } from "@chakra-ui/react";
import { create, all, evaluate } from "mathjs";
const Display = (props) => {
  return (
    <Box color="white">
      <Text>{props.state[0]}</Text>
    </Box>
  );
};

export default Display;
