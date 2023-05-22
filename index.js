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
import fs from "fs";
import path from "path";
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
    allFiles = allFiles || [];
    hadReadDir.forEach((file) => {
      if (fs.statSync(principalRoute + "/" + file).isDirectory()) {
        allFiles = allReadDirectory(principalRoute + "/" + file, allFiles);
      } else {
        allFiles.push(new URL(file, import.meta.url).pathname);
      }
    });
  }
  
 
  return allFiles;
};
allReadDirectory(routerPrueba)

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
      const recursive = allReadDirectory((routerConvert));
      // SIRVE PARA QUITAR '/' AL INICIO DE CADA RUTA
      const recursiveModif = recursive.map((doc)=> doc.slice(1, doc.length))
      console.log("ruta", routerConvert);
      console.log(recursiveModif, 'recursividad');
      // recorrer recuriveFuncion
      console.log("primer elemento", recursiveModif[0]); 
      
      const x = fs.readFile(recursiveModif[0]);

      console.log("respueta", x);

      
      // recursiveFuncion.forEach((docMd)=>{
      //   readFileMd(docMd)
      // })
      //enviar array
      //readArrayMd(recursiveFuncion)
    }
  });
};

mdLinks(routerPrueba)
  .then((res) => res)
  .catch((err) => err);
