import * as vscode from 'vscode';
import {ISmell, SmellType} from '../types';
import * as path from 'path';
import {Position} from 'vscode';
import {extractJSXToComponentToFile} from '../modules/extract-to-component';

export const displayFilesCodeSmells = async (projectSmells: ISmell[]): Promise<any> => {
  const quickPickItems = convertFileCodeSmellsToQuickPickItems(projectSmells);
  const userActions = await vscode.window.showQuickPick(quickPickItems, {canPickMany: true});
  console.log({userActions});
};

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

const convertSmellTypeToString = (type: SmellType) => {
  switch (type) {
    case SmellType.ARRAY_MAP_TO_VERBOSE_COMPONENT:
      return 'ArrayMapToVerboseComponent';
    case SmellType.CONDITION_BRANCH_VERBOSE_COMPONENT:
      return 'CondBranchToVerboseComponent';
    default:
      return '';
  }
};

const convertFileCodeSmellsToQuickPickItems = (projectSmells: ISmell[]): vscode.QuickPickItem[] => {
  return projectSmells.map((smell, i) => ({
    label: `#${i + 1} - ${path.parse(smell.fileUri.path).base}`,
    description: `${convertSmellTypeToString(smell.type)} start: ${smell.loc.start.line} end: ${smell.loc.end.line}`,
    picked: true
  }));
};