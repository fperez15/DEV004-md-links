import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  readFiles,
  readFileMd,
  extFile,
  isFile,
} from "./api.js";
import path from "path";
import fs from "fs";

// existe la ruta
const [, , routerPrueba] = process.argv;
console.log(existPath(routerPrueba));

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
    allFiles = allFiles || []
    //console.log("leer directorio", hadReadDir);
    hadReadDir.forEach((file) => {
      if (fs.statSync(principalRoute + '/' + file).isDirectory()) {
        allFiles = allReadDirectory(principalRoute + '/' + file, allFiles)
      } else {
        allFiles.push(new URL(file, import.meta.url).pathname)
      }
     
    });
    
  } 
  
  return allFiles;
};
allReadDirectory(routerPrueba);
console.log(allReadDirectory(routerPrueba), "***");

// export const mdLinks = (router, options) => {
//   return new Promise((resolve, reject) => {
//     const existRouter = existPath(router);
//     if (existRouter) {
//       const absoluteRouter = absolutePath(router);

//       let routerConvert;
//       if (absoluteRouter === false) {
//         //convertir a absoluta
//         routerConvert = convertPath(router);
//       } else {
//         routerConvert = router;
//       }

//       // preguntar si es directorio
//       directoryPath(routerConvert)
//         .then((isDirectory) => {

//           if (isDirectory) {
//             const readDirectoryPromise = readFiles(routerConvert);
//             readDirectoryPromise
//               .then((readDirectory) => {
//                 //unir rutas
//                 readDirectory.forEach((file) => {
//                   const unirRouter = `${routerConvert}\\${file}`;
//                   //luego recorro cada ruta le aplico si es directorio o si es archivo.md

//                 });

//               })
//               .catch((error) => {
//                 return error;
//               });
//           } else {
//             console.log(`${router}`);
//           }
//         })
//         .catch((error) => console.log(error));
//     }
//     if (directoryPath) {
//     }
//   });
// };

// mdLinks(path)
//   .then((res) => res)
//   .catch((err) => err);
