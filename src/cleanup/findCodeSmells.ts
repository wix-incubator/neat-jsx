import * as vscode from 'vscode';
import * as fs from 'fs';
import {parse, ParserOptions} from "@babel/parser";


export const findJsxSmellsInProject = async (smellMatchers: (() => object)[]) => {
  const files = await vscode.workspace.findFiles('src/**/*.{tsx,jsx}');
  return Promise.all(files.map((fileUri: vscode.Uri) => findJsxSmellsInFile(smellMatchers, fileUri)));
};

const findJsxSmellsInFile = async (smellMatchers: (() => object)[], fileUri: vscode.Uri) => {
  const fileAst = await convertFileToAst(fileUri);
  const fileJsxPartsCodeSmells = findJsxCodeSmells(smellMatchers, fileAst);
  return {
    fileUri,
    fileJsxPartsCodeSmells
  };
};

const findJsxCodeSmells = (smellMatchers: (() => object)[], fileAst: any) => {
  return smellMatchers
    .map((smellMatcher: any) => findAllMatches(smellMatcher, fileAst))
    .filter((smellMatches: (() => object)[]) => smellMatches.length > 0);
};

const convertFileToAst = async (fileUri: vscode.Uri) => {
  const doc = await vscode.workspace.openTextDocument(fileUri);
  return codeToAst(doc.getText());
};

const findAllMatches = (smellMatcher: any, fileAst: any) => {
  return [];
};

const codeToAst = (code: string) => {
  const parsingOptions = {
    plugins: ["objectRestSpread", "classProperties", "typescript", "jsx", "decorators-legacy","dynamicImport"],
    sourceType: "module",
  };
  try {
    return parse(code, <ParserOptions>{
      startLine: 0,
      ...parsingOptions
    });

  } catch (e) {
    console.log(e);
    console.log(code);
  }

};
