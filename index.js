import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  readFiles,
  readFileMd,
  extFile,
  isFile
} from "./api.js";

// existe la ruta
const [, , path] = process.argv;
console.log(existPath(path));

// la ruta es absoluta
// console.log(absolutePath(path));

//convertir a ruta absoluta
// console.log(convertPath(path));

//saber si la ruta es un directorio
// directoryPath(path)
//   .then((esDir) => console.log(`${esDir}`))
//   .catch((error) => console.error(`${error}`));

// read files
// readFiles(path);

// .md files
// mdFiles(path)

// read .md file
// readFileMd(path);

// files extention .md
// console.log(extFile('archivos con extension .md', path));

//is a file?
// console.log(isFile(path));

// function recursiva
const allReadDirectory = (principalRoute) => {
  let arrayReadDir = [];
  if (isFile(principalRoute) &&  extFile === '.md') {
    arrayReadDir.push(principalRoute);

  } else if (directoryPath(principalRoute)) {
    let hadReadDir = readFiles(principalRoute)
    hadReadDir.forEach(complement => {
      let hadMdFile = path.join(principalRoute, complement);
      arrayReadDir = arrayReadDir.concat(allReadDirectory(hadMdFile));
      
    });

  }
  return arrayReadDir;
  
}
allReadDirectory(path)

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
