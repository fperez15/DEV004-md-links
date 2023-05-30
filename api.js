import fs from "fs"; 
import path from "path";
import fetch from 'node-fetch';


// exist path
export const existPath = (path) => fs.existsSync(path);

// absolute path
export const absolutePath = (userPath) => path.isAbsolute(userPath);

// convert absolute route
export const convertPath = (absolutepath) => path.resolve(absolutepath);

// is directory?
export const directoryPath = (path) => fs.lstatSync(path).isDirectory();

// file extention .md
export const extFile = (route) => path.extname(route);

// read .md file
export const readFileMd = (path) =>{
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, fileMd) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileMd);
      }
    });
  })
}

//petition http
export const httpLinks = (array) => {
  const arrayHttp = array.map((obj) => {
    return fetch(obj.href)
      .then((response) => {
        obj.status = response.status;
        obj.prueba = response.statusText;
        return obj;
      })
  });

  return Promise.all(arrayHttp)
};