import { existPath, absolutePath, convertPath, directoryPath, readFiles, readFileMd } from "./api.js";

// existe la ruta
const [ , , path] = process.argv;
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

export const mdLinks = (router, options) => {
  return new Promise((resolve, reject) => {
    const existRouter = existPath(router);
  if (existRouter) {
    const absoluteRouter = absolutePath(router);
    
    let routerConvert; 
    if (absoluteRouter === false) {
      //convertir a absoluta
      routerConvert = convertPath(router);
    } else {
      routerConvert = router;
    }
    
    //preguntar si es directorio
    directoryPath(routerConvert)
      .then((isDirectory) => {
        console.log('es directorio', isDirectory);
        if (isDirectory) {
          
          const readDirectory = readFiles(routerConvert);
          console.log('leyendo directorio', readDirectory);
          readDirectory.forEach((file) => {
            
            const unirRouter = `${readDirectory}\\${file}`
            //console.log('rutas unidas', unirRouter);
      
            //unir rutas 
            //luego recorro cada ruta le aplico si es directorio o si es archivo.md 
      
          })
        } else {
          console.log(`${router}`);
        }
      })
      .catch((error) => console.log(error))
  };
  if (directoryPath) {
    
    
  }
  })

  
};

mdLinks(path)
.then((res) => res)
.catch((err) => err)

