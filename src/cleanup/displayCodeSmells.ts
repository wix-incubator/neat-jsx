import * as vscode from 'vscode';
import { ISmell, SmellType } from '../types';
import * as path from 'path';

export const displayFilesCodeSmells = async (projectSmells: ISmell[]): Promise<any> => {
  const quickPickItems = convertFileCodeSmellsToQuickPickItems(projectSmells);
  const userActions = await vscode.window.showQuickPick(quickPickItems, {canPickMany: true});
  console.log({userActions});
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
    label: `#${i+1} - ${path.parse(smell.fileUri.path).base}`,
    description: `${convertSmellTypeToString(smell.type)} start: ${smell.loc.start.line} end: ${smell.loc.end.line}`,
    picked: true
  }));
};