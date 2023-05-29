import { mdLinks } from "./index.js";

// Obtener los argumentos de la línea de comandos usando process.argv  (destructuracion de arreglos)
const [, , pathToFile, ...options] = process.argv;


// Verificar las opciones pasadas en la línea de comandos
const shouldValidate = options.includes('--validate');
const shouldShowStats = options.includes('--stats');
const optionHelp = options.includes('--help');

// Llamar a la función mdLinks con la ruta del archivo y las opciones correspondientes
mdLinks(pathToFile, { validate: shouldValidate })
  .then((links) => {
    // Verificar las opciones y mostrar los resultados correspondientes
    if (shouldShowStats) {
      console.log('Total:', links.length);
      console.log('Unique:', new Set(links.map((link) => link.href)).size);
      if (shouldValidate) {
        const brokenLinks = links.filter((link) => link.status >= 400);
        console.log('Broken:', brokenLinks.length);
      }
    } else {
      links.forEach((link) => {
        const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
        console.log(`${link.file} ${link.href} ${truncatedText}`);
      });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });