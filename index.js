import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  readFiles,
  readFileMd,
  extFile,
  isFile,
  httpLinks,
} from "./api.js";
import fs from "fs";
import path from "path";

// existe la ruta
const [, , routerPrueba] = process.argv;
// console.log(existPath(routerPrueba));

// la ruta es absoluta
// console.log(absolutePath(routerPrueba));

//convertir a ruta absoluta
// console.log(convertPath(routerPrueba));

//saber si la ruta es un directorio
// directoryPath(routerPrueba)
//   .then((esDir) => console.log(`${esDir}`))
//   .catch((error) => console.error(`${error}`));

// read files
// readFiles(routerPrueba);

// .md files
// mdFiles(routerPrueba)

// read .md file
// readFileMd(routerPrueba);

// files extention .md
// console.log(extFile('archivos con extension .md', routerPrueba));

//is a file?
// console.log(isFile(routerPrueba));

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

            // devolver los enlaces encontrados
            console.log("links encontrados", links); 
            // links => fn quue recorrar el array (links) y por cada url
            // hacer la peticion http y añadir status y ok
            httpLinks(links).then((respuesta)=>{
              console.log('%c', respuesta, 'color:orange');
            })
            resolve(links);
          }
        })
        .catch((err) => {
          reject(err); //manejar errores
        });
    }
  });
};

mdLinks(routerPrueba)
  .then((res) => res)
  .catch((err) => err);
