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

const [, , routerPrueba] = process.argv;

// function recursive
const allReadDirectory = (principalRoute, allFiles) => {
  let arrayReadDir = [];

  if (extFile(principalRoute) === ".md") {
    //console.log("holaaa", principalRoute);
    arrayReadDir.push(principalRoute);
  } else if (directoryPath(principalRoute)) {
    let hadReadDir = fs.readdirSync(principalRoute);
    allFiles = allFiles || [];
    hadReadDir.forEach((file) => {
      const filePath = path.join(principalRoute, file); // Construct the full path using path.join()

      if (fs.statSync(filePath).isDirectory()) {
        allFiles = allReadDirectory(filePath, allFiles);
      } else {
        allFiles.push(filePath);
      }
    });
  }

  return allFiles;
};

export const mdLinks = (router, options) => {
  return new Promise((resolve, reject) => {
    const existRouter = existPath(router);
    if (existRouter) {
      const absoluteRouter = absolutePath(router);

      let routerConvert;

      if (absoluteRouter === false) {
        //convert to absolute
        routerConvert = convertPath(router);
      } else {
        routerConvert = router;
      }

      //recursion
      const recursive = allReadDirectory(routerConvert);

      if (recursive.length === 0) {
        resolve("No hay archivos tipo .md");
      }

      //I loop my recursion
      const promisesRecursive = recursive.map((filePath) =>
        readFileMd(filePath)
      ); // I create an array of promises
      // resolve all promises from promisesRecursive
      Promise.all(promisesRecursive)
        .then((fileContents) => {
          const linkRegExp = /\[([^\]]+)\]\(([^\)]+)\)/g;
          //array to store the found links
          const links = [];

          //I go through my array of .md files to know the path of where my link is
          for (let i = 0; i < fileContents.length; i++) {
            const fileContent = fileContents[i];
            //get the matches using matchAll()
            const matches = [...fileContent.matchAll(linkRegExp)];

            //loop through matches and extract links
            for (const match of matches) {
              //recursive[i] the address of my route md where is my link
              //match[1] is the text
              //match[2] is the url
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
            // If I don't put an options parameter, I resolve like this
            resolve(links);
          } else {
            if (typeof options !== "object") {
              //To make sure that the options parameter is type object!!!
              resolve("Enter an object type option");
            } else {
              if ("validate" in options) {
                const valueOptions = options.validate;
                // validate --> TRUE
                if (valueOptions === true) {
                  // http request
                  httpLinks(links)
                    //return the array of objects with href, text, file, status and ok or fail
                    .then((res) => resolve(res))
                    .catch((err) => err);
                  // validate --> FALSE
                } else if (valueOptions === false) {
                  resolve(links);
                } else {
                  resolve(
                    "The value for the attribute is boolean enter true or false"
                  );
                }
              } else {
                resolve("Enter the 'validate' attribute in the options object");
              }
            }
          }
        })
        .catch((err) => {
          reject(err); //handle errors
        });
    } else {
      resolve("Please enter a valid path");
    }
  });
};

// mdLinks(routerPrueba, { validate: true })
//   .then((res) => console.log(res))
//   .catch((err) => err);
