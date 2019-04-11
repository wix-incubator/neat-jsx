import * as vscode from 'vscode';

export interface IFileSmells {
  uri: vscode.Uri;
  smells: ISmell[];
}

export interface ISmell {
  type: SmellType;
  startLine: number;
  endLine: number;
}

export enum SmellType {
  ARRAY_MAP_TO_VERBOSE_COMPONENT,
  CONDITION_BRANCH_VERBOSE_COMPONENT,
}

export type SmellMatcher = (ast: any) => ISmell[];