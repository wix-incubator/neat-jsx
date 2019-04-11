import * as vscode from 'vscode';
import * as fs from 'fs';
import {parse, ParserOptions} from "@babel/parser";
import { SmellMatcher, ISmell } from '../types';


export const findJsxSmellsInProject = async (smellMatchers: SmellMatcher[]) => {
  const files = await vscode.workspace.findFiles('src/**/*.{tsx,jsx}');
  return Promise.all(files.map((fileUri: vscode.Uri) => findJsxSmellsInFile(smellMatchers, fileUri)));
};

const findJsxSmellsInFile = async (smellMatchers: SmellMatcher[], fileUri: vscode.Uri) => {
  const fileAst = await convertFileToAst(fileUri);
  const fileJsxPartsCodeSmells = findJsxCodeSmells(smellMatchers, fileAst);
  return {
    fileUri,
    fileJsxPartsCodeSmells
  };
};

const findJsxCodeSmells = (smellMatchers: SmellMatcher[], fileAst: any): ISmell[] => {
  return smellMatchers
    .map((smellMatcher: SmellMatcher) => findAllMatches(smellMatcher, fileAst))
    .reduce((acc: ISmell[], curr: ISmell[]): ISmell[] => [...acc, ...curr], []);
};

const convertFileToAst = async (fileUri: vscode.Uri) => {
  const doc = await vscode.workspace.openTextDocument(fileUri);
  return codeToAst(doc.getText());
};

const findAllMatches = (smellMatcher: SmellMatcher, fileAst: any): ISmell[] => {
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
