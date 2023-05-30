import { mdLinks } from "./index.js";
import chalk from "chalk";

// Get command line arguments using process.argv (array destruct)
const [, , pathToFile, ...options] = process.argv;

// Check the options passed on the command line
const shouldValidate = options.includes("--validate");
const shouldShowStats = options.includes("--stats");

if (pathToFile === undefined) {
  //if pathToFile is undefined?
  console.log(
    chalk.bgRed.bold("Please, enter  a path or enter ") +
      chalk.bgRed.bold.italic("--help") +
      chalk.bgRed.bold(" to see the instructions...")
  );
} else {
  // if exist path
  if (shouldValidate || shouldShowStats) {
    //all logic with --validate and/or --stats
    mdLinks(pathToFile, { validate: shouldValidate })
      .then((links) => {
        //Check the options and display the corresponding results
        if (shouldShowStats) {
          console.log(chalk.yellowBright.bold("Links Total:", links.length));
          console.log(
            chalk.greenBright.bold(
              "Links Unique:",
              new Set(links.map((link) => link.href)).size
            )
          );
          if (shouldValidate) {
            const brokenLinks = links.filter((link) => link.status >= 400);
            console.log(
              chalk.redBright.bold("Links Broken:", brokenLinks.length)
            );
          }
        } else {
          //if both shouldShowStats or shouldValidate is false I show my object array with file, href and text
          links.forEach((link) => {
            const truncatedText =
              link.text.length > 50
                ? link.text.slice(0, 50) + "..."
                : link.text;
            console.log(
              `\n${
                chalk.bgBlue.bold("File:") + chalk.blueBright.italic(link.file)
              }\n${
                chalk.bgGreen.bold("href:") +
                chalk.greenBright.italic(link.href)
              }\n${
                chalk.bgMagenta.bold("text:") +
                chalk.magentaBright.italic(truncatedText)
              }\n`
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    //if there is no route I show the options
    console.log(chalk.bgRed.bold("You can use the following options... \n"));

    console.log(
      chalk.yellow.inverse("   enter the path  ") +
        " " +
        chalk.yellow.bold.italic("It will show the links")
    );
    console.log(
      chalk.green.inverse("     --validate    ") +
        " " +
        chalk.green.bold.italic(
          "It will show you the links with their status ok or fail"
        )
    );
    console.log(
      chalk.blue.inverse("      --stats      ") +
        " " +
        chalk.blue.bold.italic(
          "It will show you the statistics of total and unique links"
        )
    );
    console.log(
      chalk.magenta.inverse("--validate --stats ") +
        " " +
        chalk.magenta.bold.italic(
          "It will show you the statistics of total, unique and broken links"
        )
    );
  }
}
