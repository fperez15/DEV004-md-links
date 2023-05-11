import { existPath, absolutePath, convertPath, directoryPath, readFiles, mdFiles } from "./api.js";

// existe la ruta
const [ , , path] = process.argv;
console.log(existPath(path));

// la ruta es absoluta
console.log(absolutePath(path));

//convertir a ruta absoluta
console.log(convertPath(path));

//saber si la ruta es un directorio
directoryPath(path)
  .then((esDir) => console.log(`${esDir}`))
  .catch((error) => console.error(`${error}`));

// read files
readFiles(path);

// .md files
mdFiles(path)

