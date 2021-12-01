import "./App.css";
import { Box, Center, SimpleGrid, Button } from "@chakra-ui/react";
import { useState } from "react";
import { create, all } from "mathjs";
import Display from "./Components/Display";

const btnList = [
  "AC",
  "π",
  "e",
  "⌫",
  "^",
  "x²",
  "√",
  "×",
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  "●",
  "0",
  "%",
  "=",
];

function App() {
  const [state, setState] = useState(["2 + 3(2 + 1)", ""]);

  const lastItem = state[0].split(" ")[state[0].split(" ").length - 1];

  const processedState = (str) => {
    return str.split(" ");
  };

  const numberHandler = (str) => {
    setState((prev) => [prev[0] + str, prev[1]]);
  };

  const operatorHandler = (str) => {
    if (state[0].length === 0) return setState((prev) => [prev[0], prev[1]]);

    if (str === "×") {
      if (state[0][state[0].length - 2] === "×") {
        setState((prev) => [prev[0], prev[1]]);
      } else if (
        state[0][state[0].length - 2] === "+" ||
        state[0][state[0].length - 2] === "-" ||
        state[0][state[0].length - 2] === "^" ||
        state[0][state[0].length - 2] === "÷"
      ) {
        setState((prev) => [
          prev[0].slice(0, prev[0].length - 3) + ` ${str} `,
          prev[1],
        ]);
      } else {
        setState((prev) => [prev[0] + ` ${str} `, prev[1]]);
      }
    }

    if (str === "+") {
      if (state[0][state[0].length - 2] === "+") {
        setState((prev) => [prev[0], prev[1]]);
      } else if (
        state[0][state[0].length - 2] === "×" ||
        state[0][state[0].length - 2] === "-" ||
        state[0][state[0].length - 2] === "^" ||
        state[0][state[0].length - 2] === "÷"
      ) {
        setState((prev) => [
          prev[0].slice(0, prev[0].length - 3) + ` ${str} `,
          prev[1],
        ]);
      } else {
        setState((prev) => [prev[0] + ` ${str} `, prev[1]]);
      }
    }

    if (str === "÷") {
      if (state[0][state[0].length - 2] === "÷") {
        setState((prev) => [prev[0], prev[1]]);
      } else if (
        state[0][state[0].length - 2] === "×" ||
        state[0][state[0].length - 2] === "-" ||
        state[0][state[0].length - 2] === "^" ||
        state[0][state[0].length - 2] === "+"
      ) {
        setState((prev) => [
          prev[0].slice(0, prev[0].length - 3) + ` ${str} `,
          prev[1],
        ]);
      } else {
        setState((prev) => [prev[0] + ` ${str} `, prev[1]]);
      }
    }

    if (str === "-") {
      if (state[0][state[0].length - 2] === "-") {
        setState((prev) => [prev[0], prev[1]]);
      } else if (
        state[0][state[0].length - 2] === "×" ||
        state[0][state[0].length - 2] === "÷" ||
        state[0][state[0].length - 2] === "^" ||
        state[0][state[0].length - 2] === "+"
      ) {
        setState((prev) => [
          prev[0].slice(0, prev[0].length - 3) + ` ${str} `,
          prev[1],
        ]);
      } else {
        setState((prev) => [prev[0] + ` ${str} `, prev[1]]);
      }
    }

    if (str === "^") {
      if (state[0][state[0].length - 2] === "^") {
        setState((prev) => [prev[0], prev[1]]);
      } else if (
        state[0][state[0].length - 2] === "+" ||
        state[0][state[0].length - 2] === "×" ||
        state[0][state[0].length - 2] === "-" ||
        state[0][state[0].length - 2] === "÷"
      ) {
        setState((prev) => [
          prev[0].slice(0, prev[0].length - 3) + ` ${str} `,
          prev[1],
        ]);
      } else {
        setState((prev) => [prev[0] + ` ${str} `, prev[1]]);
      }
    }
  };

  const clearHandler = () => {
    setState(["", ""]);
  };

  const deleteLastInput = () => {
    state[0][state[0].length - 1] === " "
      ? setState((prev) => [prev[0].slice(0, prev[0].length - 3), prev[1]])
      : setState((prev) => [prev[0].slice(0, prev[0].length - 1), prev[1]]);
  };

  const dotHandler = () => {
    if (lastItem === "") {
      setState((prev) => [prev[0] + "0.", prev[1]]);
    } else if (lastItem.includes(".")) {
      setState((prev) => [prev[0], prev[1]]);
    } else {
      setState((prev) => [prev[0] + ".", prev[1]]);
    }
  };

  const eva = (arr) => {
    if (arr.length === 1)
      return setState((prev) => [arr[0].toString(), prev[1]]);
    let newArr = arr;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "^") {
        newArr = [
          ...arr.slice(0, i - 1),
          Math.pow(arr[i - 1], arr[i + 1]),
          ...arr.slice(i + 2),
        ];
        return eva(newArr);
      } else if (!arr.includes("^") && arr[i] === "×") {
        newArr = [
          ...arr.slice(0, i - 1),
          arr[i - 1] * arr[i + 1],
          ...arr.slice(i + 2),
        ];
        return eva(newArr);
      } else if (arr[i] === "÷") {
        if (arr[i + 1] === "0") {
          return setState((prev) => [`You can't divide by 0`, prev[1]]);
        }
        newArr = [
          ...arr.slice(0, i - 1),
          +arr[i - 1] / +arr[i + 1],
          ...arr.slice(i + 2),
        ];
        return eva(newArr);
      } else if (
        !arr.includes("^") &&
        !arr.includes("×") &&
        !arr.includes("÷") &&
        arr[i] === "+"
      ) {
        newArr = [
          ...arr.slice(0, i - 1),
          +arr[i - 1] + +arr[i + 1],
          ...arr.slice(i + 2),
        ];
        return eva(newArr);
      } else if (
        !arr.includes("^") &&
        !arr.includes("×") &&
        !arr.includes("÷") &&
        arr[i] === "-"
      ) {
        newArr = [
          ...arr.slice(0, i - 1),
          +arr[i - 1] - +arr[i + 1],
          ...arr.slice(i + 2),
        ];
        return eva(newArr);
      }
    }
    return eva(newArr);
  };

  const wierdHandler = (str) => {
    if (lastItem === "") {
      setState((prev) => [...prev]);
    } else if (state[0].split(" ").length === 1 && str === "%") {
      setState((prev) => [percentage(+prev[0]), prev[1]]);
    } else if (state[0].split(" ").length === 1 && str === "√") {
      setState((prev) => [sqrtNum(+prev[0]), prev[1]]);
    } else if (state[0].split(" ").length === 1 && str === "x²") {
      setState((prev) => [squareNum(+prev[0]), prev[1]]);
    } else {
      if (str === "%") {
        setState((prev) => {
          const helper = prev[0].split(" ")[prev[0].split(" ").length - 1];
          return [
            prev[0]
              .split(" ")
              .slice(0, prev[0].split(" ").length - 1)
              .join(" ") + ` ${percentage(helper)}`,
            prev[1],
          ];
        });
      }
      if (str === "x²") {
        setState((prev) => {
          const helper = prev[0].split(" ")[prev[0].split(" ").length - 1];
          return [
            prev[0]
              .split(" ")
              .slice(0, prev[0].split(" ").length - 1)
              .join(" ") + ` ${squareNum(helper)}`,
            prev[1],
          ];
        });
      }
      if (str === "√") {
        setState((prev) => {
          const helper = prev[0].split(" ")[prev[0].split(" ").length - 1];
          return [
            prev[0]
              .split(" ")
              .slice(0, prev[0].split(" ").length - 1)
              .join(" ") + ` ${sqrtNum(helper)}`,
            prev[1],
          ];
        });
      }
    }
  };

  const percentage = (a) => {
    const newA = a / 100;
    return newA.toString();
  };
  const squareNum = (a) => {
    const newA = a * a;
    return newA.toString();
  };

  const sqrtNum = (a) => {
    const newA = Math.sqrt(a);
    return newA.toString();
  };

  const botoes = btnList.map((str) => {
    if (
      str === "1" ||
      str === "2" ||
      str === "3" ||
      str === "4" ||
      str === "5" ||
      str === "6" ||
      str === "7" ||
      str === "8" ||
      str === "9" ||
      str === "0"
    ) {
      const funcHandler = () => numberHandler(str);
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          bg="white"
          height="80px"
          onClick={funcHandler}
        >
          {str}
        </Button>
      );
    }

    if (
      str === "^" ||
      str === "×" ||
      str === "÷" ||
      str === "-" ||
      str === "+"
    ) {
      const funcHandler = () => operatorHandler(str);
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          color="black"
          colorScheme="teal"
          height="80px"
          onClick={funcHandler}
        >
          {str}
        </Button>
      );
    }
    if (str === "x²" || str === "√") {
      const funcHandler = () => wierdHandler(str);
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          color="black"
          colorScheme="teal"
          height="80px"
          onClick={funcHandler}
        >
          {str}
        </Button>
      );
    }
    if (str === "%") {
      const funcHandler = () => wierdHandler(str);
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          bg="white"
          height="80px"
          onClick={funcHandler}
        >
          {str}
        </Button>
      );
    }
    if (str === "●") {
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          bg="white"
          height="80px"
          onClick={dotHandler}
        >
          {str}
        </Button>
      );
    }
    if (str === "⌫") {
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          color="black"
          colorScheme="teal"
          height="80px"
          onClick={deleteLastInput}
        >
          {str}
        </Button>
      );
    }
    if (str === "=") {
      const funcHandler = () => eva(processedState(state[0]));
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          colorScheme="teal"
          height="80px"
          color="black"
          onClick={funcHandler}
        >
          {str}
        </Button>
      );
    }
    if (str === "AC") {
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          colorScheme="teal"
          color="black"
          height="80px"
          onClick={clearHandler}
        >
          {str}
        </Button>
      );
    } else {
      return (
        <Button
          cursor="pointer"
          fontSize="25px"
          colorScheme="teal"
          color="black"
          height="80px"
        >
          {str}
        </Button>
      );
    }
  });

  return (
    <Center pt={10} bgGradient="linear(to-r, purple.900, blue.700)" h={900}>
      <Box
        w={400}
        bg="black"
        fontFamily="Roboto"
        fontSize="70px"
        borderRadius="10px"
        w="325px"
        boxShadow="dark-lg"
      >
        <Display state={state} />
        <SimpleGrid columns={4} m={1} spacing={1}>
          {botoes}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default App;
