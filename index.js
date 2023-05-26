import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  readFileMd,
  extFile,
  httpLinks,
} from "./api.js";
import fs, { link } from "fs";
import path from "path";

// existe la ruta
const [, , routerPrueba] = process.argv;
// console.log(existPath(routerPrueba));

// function recursiva
const allReadDirectory = (principalRoute, allFiles) => {
  let arrayReadDir = [];

  if (extFile(principalRoute) === ".md") {
    //console.log("holaaa", principalRoute);
    arrayReadDir.push(principalRoute);
  } else if (directoryPath(principalRoute)) {
    let hadReadDir = fs.readdirSync(principalRoute);
    allFiles = allFiles || [];
    hadReadDir.forEach((file) => {
      const filePath = path.join(principalRoute, file); // Construir la ruta completa utilizando path.join()

      // if (fs.statSync(principalRoute + "/" + file).isDirectory()) {
      //   allFiles = allReadDirectory(principalRoute + "/" + file, allFiles);
      //   console.log("test2", allFiles);
      // } else {
      //   allFiles.push(new URL(file, import.meta.url).pathname);
      //   console.log("test3", allFiles);
      // }
      if (fs.statSync(filePath).isDirectory()) {
        allFiles = allReadDirectory(filePath, allFiles);
      } else {
        allFiles.push(filePath);
      }
    });
  }

  return allFiles;
};

allReadDirectory(routerPrueba);

export const mdLinks = (router, options) => {
  return new Promise((resolve, reject) => {
    const existRouter = existPath(router);
    if (existRouter) {
      const absoluteRouter = absolutePath(router);

      let routerConvert;

      if (absoluteRouter === false) {
        //convertir a absoluta
        routerConvert = convertPath(router);
        // pregunto si es un directorio
      } else {
        routerConvert = router;
      }

      //recursividad
      const recursive = allReadDirectory(routerConvert);

      if (recursive.length === 0) {
        resolve("No hay archivos tipo .md");
      }

      // SIRVE PARA QUITAR '/' AL INICIO DE CADA RUTA
      //const recursiveModif = recursive.map((doc)=> doc.slice(1, doc.length))

      //console.log("Elementos: ", recursive);

      //recorro mi recursividad
      const promisesRecursive = recursive.map((filePath) =>
        readFileMd(filePath)
      ); // Creo un array de promesas
      // resuelvo todas la promesas de promisesRecursive
      Promise.all(promisesRecursive)
        .then((fileContents) => {
          const linkRegExp = /\[([^\]]+)\]\(([^\)]+)\)/g;
          //array para almacenar los enlaces encontrados
          const links = [];

          //recorrer mi array de archivos .md para saber la ruta de donde es mi link
          for (let i = 0; i < fileContents.length; i++) {
            const fileContent = fileContents[i];
            // obtener las coincidencias utilizando matchAll()
            const matches = [...fileContent.matchAll(linkRegExp)];

            //recorrer las coincidencias y extraer los enlaces
            for (const match of matches) {
              //recursive[i] la direccion de mi ruta md donde esta mi link
              //match[1] es el texto
              //match[2] es la url
              const link = {
                href: match[2],
                text: match[1],
                file: recursive[i],
              };
              links.push(link);
            }
          }

          // are there links? --> NO
          if (links.length === 0) {
            resolve("No Links Found");
          }

          if (options === undefined) {
            // Si es que no pongo un parámetro de options me resuelvo esto
            resolve(links);
          } else {
            if (typeof options !== "object") {
              // Para asegurarnos que el parámetro options sea tipo objeto!!!
              resolve("Ingrese una opción tipo objeto");
            } else {
              if ("validate" in options) {
                const valueOptions = options.validate;
                // validate --> TRUE
                if (valueOptions === true) {
                  // http request
                  httpLinks(links)
                    // devolver el array de objetos con href, text, file, status y ok or fail
                    .then((res) => resolve(res))
                    .catch((err) => err);
                  // validate --> FALSE
                } else if (valueOptions === false) {
                  resolve(links);
                } else {
                  resolve(
                    "El valor para el atributo es booleano ingrese true o false"
                  );
                }
              } else {
                resolve(
                  "Ingrese el atributo de 'validate' en el objeto de options"
                );
              }
            }
          }
        })
        .catch((err) => {
          reject(err); //manejar errores
        });
    } else {
      resolve("Ingrese una ruta válida");
    }
  });
};

mdLinks(routerPrueba, { validate: true })
  .then((res) => console.log(res))
  .catch((err) => err);

// const array = [
//   {
//     href: 'https://www.tutorialspoint.com/process-argv-method-in-node-js',
//     text: 'Process argv Method',
//     file: 'C:\\Users\\Fernando\\Documents\\francis\\DEV004-md-links\\prueba\\archivo.md'
//   },
//   {
//     href: 'https://www.freecodecamp.org/espanol/news/funciones-callback-en-javascript-que-son-los-callback-en-js-y-como-usarlos/',
//     text: 'Callbacks',
//     file: 'C:\\Users\\Fernando\\Documents\\francis\\DEV004-md-links\\prueba\\archivo.md'
//   },
//   {
//     href: 'https://www.freecodecamp.org/espanol/news/que-es-una-promesa-promesas-de-javascript-para-principiantes/',
//     text: 'Promesas',
//     file: 'C:\\Users\\Fernando\\Documents\\francis\\DEV004-md-links\\prueba\\archivo.md'
//   }
// ]

// httpLinks(array)
//   .then((res) => console.log(res))
//   .catch((err) => err);
