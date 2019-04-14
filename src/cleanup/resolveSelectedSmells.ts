import * as vscode from 'vscode';
import {ISmell} from '../types';
import {Position} from 'vscode';
import {extractJSXToComponentToFile} from '../modules/extract-to-component';

const extractSmell = (smell: ISmell) => {
  if (!smell) {
    return;
  }
  const loc = smell.loc;
  const start: Position = new Position(loc.start.line, loc.start.column);
  const end: Position = new Position(loc.end.line, loc.end.column);
  const range: vscode.Range = new vscode.Range(start, end);
  return extractJSXToComponentToFile(range, smell.fileUri.path);
};

export const resolveCodeSmells = async (codeSmellsToResolve: ISmell[]) => {
  for (let i=codeSmellsToResolve.length-1; i>=0; i--) {
    await extractSmell(codeSmellsToResolve[i]);
  }
};