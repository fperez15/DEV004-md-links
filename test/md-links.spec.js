import {
  existPath,
  absolutePath,
  convertPath,
  directoryPath,
  extFile,
  readFileMd
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


