import { Box, Text } from "@chakra-ui/react";
const Display = (props) => {
  return (
    <Box color="white">
      <Text>{props.state[0]}</Text>
    </Box>
  );
};

export default Display;
