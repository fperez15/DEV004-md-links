import { mdLinks } from "./index.js";
import chalk from "chalk";

// Obtener los argumentos de la línea de comandos usando process.argv  (destructuracion de arreglos)
const [, , pathToFile, ...options] = process.argv;

// Verificar las opciones pasadas en la línea de comandos
const shouldValidate = options.includes("--validate");
const shouldShowStats = options.includes("--stats");

// Llamar a la función mdLinks con la ruta del archivo y las opciones correspondientes
if (pathToFile === undefined) {
  //si pathToFile no existe?
  console.log(
    chalk.bgRed.bold("Please, enter  a path or enter ") +
      chalk.bgRed.bold.italic("--help") +
      chalk.bgRed.bold(" to see the instructions...")
  );
} else {
  if (shouldValidate || shouldShowStats) {
    // toda la logica con --validate y/o --stats
    mdLinks(pathToFile, { validate: shouldValidate })
      .then((links) => {
        // Verificar las opciones y mostrar los resultados correspondientes
        if (shouldShowStats) {
          console.log(chalk.yellowBright.bold("Links Total:", links.length));
          console.log(chalk.greenBright.bold("Links Unique:", new Set(links.map((link) => link.href)).size));
          if (shouldValidate) {
            const brokenLinks = links.filter((link) => link.status >= 400);
            console.log(chalk.redBright.bold("Links Broken:", brokenLinks.length));
          }
        } else {
          links.forEach((link) => {
            const truncatedText =
              link.text.length > 50
                ? link.text.slice(0, 50) + "..."
                : link.text;
            console.log(` ${chalk.bgBlue.bold('File:')+chalk.blueBright.italic(link.file)}\n${chalk.bgGreen.bold('href:')+chalk.greenBright.italic(link.href)}\n${chalk.bgMagenta.bold('text:')+chalk.magentaBright.italic(truncatedText)}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log(
      chalk.bgRed.bold("You can use the following options... \n")
    );

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
