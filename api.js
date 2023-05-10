import fs from "fs"; // api callback --> fs.stat(ruta, callback)
//fs.stat(ruta, callback) --> retrna una promeas
//const fsp = fs.promise  -->fsp.stat(ruta) --> returna promesa
import path from "path";

// read the path
// readFile('test/prueba.md', 'utf8', (error, data) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(data);
//   }
// });

// validate path
// const validatePath = 'test/prueba.md';

// access(validatePath, (error) => {
//   if (error) {
//     console.error(` invalid path`);
//   } else {
//     console.log(`validate path`);
//   }
// });

//--------------------------------------------------------------------------------------

// existe la ruta
export const existPath = (path) => fs.existsSync(path);

// absolute path
export const absolutePath = (userPath) => path.isAbsolute(userPath);

// convertir a ruta absoluta
export const convertPath = (absolutepath) => path.resolve(absolutepath);

// mi ruta es un directorio o no?
export const directoryPath = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) return reject(err);
      resolve(stats.isDirectory());
    });
  });
};

// if (stats.isDirectory()) {
//     console.log(path, "es directorio");

//   } else {
//     console.log(path, "no es un directorio");

//   }

// export const mdLinks = (router, options) => {
//   const existRouter = existPath(router);
//   if (existRouter) {
//     const absoluteRouter = absolutePath(router);

//     if (absoluteRouter === false) {
//       //convertir a absoluta
//       const convertRouter = convertPath(router);
//     }
//     //preguntar si es directorio
//     directoryPath(router, (isDirectory) => {

//       if (isDirectory) {

//       }

//     });

//     directoryPath(router) //promesas
//       .then((isDirectory) => {
//         if (isDirectory) {
//         }
//       });

/*
    if (absoluteRouter){
        preguntar si es directorio
    }else {
        convertir a absoluta
        preguntar si es directorio
    }
    */
//   }
// };
