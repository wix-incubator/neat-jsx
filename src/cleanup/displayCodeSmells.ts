import * as vscode from 'vscode';
import {ISmell, SmellType} from '../types';
import * as path from 'path';

export const pickCodeSmellsToResolve = async (projectSmells: ISmell[]): Promise<any> => {
  const quickPickItems = convertFileCodeSmellsToQuickPickItems(projectSmells);
  const pickedSmells = (await vscode.window.showQuickPick(quickPickItems, {canPickMany: true})) || [];
  console.log('pickedSmells ------->', pickedSmells);
  const smellsToResolvesIndexs = pickedSmells.map(convertPickedSmellToIndex);
  console.log('smellsToResolvesIndexs ------->', smellsToResolvesIndexs);
  return projectSmells.filter((smell, i) => smellsToResolvesIndexs.includes(i));
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
    label: `#${i} - ${path.parse(smell.fileUri.path).base}`,
    description: `${convertSmellTypeToString(smell.type)} start: ${smell.loc.start.line} end: ${smell.loc.end.line}`,
    picked: true
  }));
};

const convertPickedSmellToIndex = (pickedSmell: vscode.QuickPickItem): number => {
  const smellIndexRegex = /^#(.*) -/;
  const indexRegexMatch = smellIndexRegex.exec(pickedSmell.label || '');
  if (indexRegexMatch) {
    return Number(indexRegexMatch[1]);
  } else {
    return -1;
  }
};