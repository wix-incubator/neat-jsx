import * as vscode from 'vscode';
import * as fs from 'fs';
import { parse, ParserOptions } from "@babel/parser";


export const findJsxSmellsInProject = async (smellMatchers) => {
  const files = await vscode.workspace.findFiles('**/*.{tsx,jsx}');
  return Promise.all(files.map((fileUri: vscode.Uri) => findJsxSmellsInFile(smellMatchers, fileUri)));
};

const findJsxSmellsInFile = async (smellMatchers, fileUri: vscode.Uri) => {
  const fileAst = await convertFileToAst(fileUri);
  const fileJsxPartsCodeSmells = findJsxCodeSmells(smellMatchers ,fileAst);
  return {
    fileUri,
    fileJsxPartsCodeSmells
  };
};

const findJsxCodeSmells = (smellMatchers, fileAst: any) => {
  return smellMatchers
    .map((smellMatcher: any) => findAllMatches(smellMatcher, fileAst))
    .filter((smellMatches: []) => smellMatches.length > 0);
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
    plugins: ["objectRestSpread", "classProperties", "typescript", "jsx"],
    sourceType: "module"
  };

  return parse(code, <ParserOptions>{
    startLine: 0,
    ...parsingOptions
  });
};
