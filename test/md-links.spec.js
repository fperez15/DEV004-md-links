import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  extFile,
  readFileMd,
  httpLinks,
} from "../api.js";

describe("existPath", () => {
  it("should return true if the path exist", () => {
    expect(
      existPath(
        "C:\\Users\\Francis\\OneDrive\\Escritorio\\Laboratoria\\DEV004-md-links"
      )
    ).toBe(true);
  });
  it("should return false if the path does not exist", () => {
    expect(
      existPath("C:\\Users\\Francis\\OneDrive\\Escritorio\\Laboratoria\\DEV04")
    ).toBe(false);
  });
});

describe("absolutePath", () => {
  it("should return true if the path is absolute", () => {
    expect(
      absolutePath(
        "C:\\Users\\Francis\\OneDrive\\Escritorio\\Laboratoria\\DEV004-md-links"
      )
    ).toBe(true);
  });
  it("should return false if the path is not absolute", () => {
    expect(absolutePath("test\\prueba.md")).toBe(false);
  });
});

describe("convertToAbsolutePath", () => {
  it("should return the path converted to absolute", () => {
    expect(convertPath("test\\prueba.md")).toBe(
      "C:\\Users\\Francis\\OneDrive\\Escritorio\\Laboratoria\\DEV004-md-links\\test\\prueba.md"
    );
  });
});

describe("isPathDirectory", () => {
  it("should return true if the path is a directory", () => {
    expect(directoryPath("prueba\\prueba2")).toBe(true);
  });

  it("should return false if the path is not a directory", () => {
    expect(directoryPath("prueba\\archivo.md")).toBe(false);
  });
});

describe("extention File", () => {
  it("should return the file extension correctly", () => {
    expect(extFile("prueba\\archivo.md")).toBe(".md");
  });
  it("should return an empty string if there is no file extension", () => {
    expect(extFile("prueba\\archivo")).toBe("");
  });
});

describe("readFileMd", () => {
  it("should read a .md file correctly", () => {
    return readFileMd("prueba\\archivo.md").then((fileMd) => {
      expect(fileMd).toBeDefined();
    });
  });

  it("should reject the promise if an error occurs", () => {
    return readFileMd("prueba\\archivos.md").catch((err) => {
      expect(err).toBeDefined();
    });
  });
});

describe("httpLinks", () => {
  it("debería devolver un array con los objetos actualizados", () => {
    const array = [
      { href: "https://www.tutorialspoint.com/process-argv-method-in-node-js" },
      { href: "https://openwebinars.net/blog/que-es-nodejs/" },
      { href: "https://es.wikipedia.org/wiki/Markdown" },
    ];

    // Mockear la función fetch para simular las respuestas de las peticiones HTTP
    global.fetch = jest.fn().mockImplementation((url) => {
      if (
        url === "https://www.tutorialspoint.com/process-argv-method-in-node-js"
      ) {
        return Promise.resolve({ status: 200, statusText: "OK" });
      } else if (url === "https://openwebinars.net/blog/que-es-nodejs/") {
        return Promise.resolve({ status: 404, statusText: "Not Found" });
      } else if (url === "https://es.wikipedia.org/wiki/Markdown") {
        return Promise.resolve({
          status: 500,
          statusText: "Internal Server Error",
        });
      }
    });
    expect(httpLinks(array)).resolves.toStrictEqual([
      {
        href: "https://www.tutorialspoint.com/process-argv-method-in-node-js",
        status: 200,
        prueba: "OK",
      },
      {
        href: "https://openwebinars.net/blog/que-es-nodejs/",
        status: 200,
        prueba: "OK",
      },
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        status: 200,
        prueba: "OK",
      },
    ]);
  });
});
