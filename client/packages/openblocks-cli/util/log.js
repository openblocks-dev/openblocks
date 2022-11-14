import chalk from "chalk";

const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright",
];

colors.forEach((color) => {
  console[color] = (text) => {
    console.log(chalk[color](text));
  };
});

export const logBug = (text) => {
  console.red(`${text}\n This maybe is a bug, you can issue a bug for us.`);
};
