import fs from "fs"; // api callback --> fs.stat(ruta, callback)
//fs.stat(ruta, callback) --> retrna una promeas
//const fsp = fs.promise  -->fsp.stat(ruta) --> returna promesa
import path from "path";


// exist path
export const existPath = (path) => fs.existsSync(path);

// absolute path
export const absolutePath = (userPath) => path.isAbsolute(userPath);

// convert absolute route
export const convertPath = (absolutepath) => path.resolve(absolutepath);

// is directory?
export const directoryPath = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) return reject(err);
      resolve(stats.isDirectory());
    });
  });
};

// read folder
export const readFiles = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files)
      }
    })
  })
}

// es un archivo?
export const isFile = (route) => fs.statSync(route).isFile();

// file extention .md
export const extFile = (route) => path.extname(route);

// read .md file
export const readFileMd = (path) =>
  fs.readFile(path, "utf8", (err, fileMd) => {
    if (err) {
      console.error("error en leer archivo.md", err);
    } else {
      console.log("Leer archivo.md", fileMd);
    }
  });

// recursion


