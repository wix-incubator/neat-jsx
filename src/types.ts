import * as vscode from 'vscode';
import {SourceLocation} from '@babel/types';

export interface IFileSmells {
  uri: vscode.Uri;
  smells: ISmell[];
}

export interface ISmell {
  type: SmellType;
  loc:SourceLocation;
}

export enum SmellType {
  ARRAY_MAP_TO_VERBOSE_COMPONENT,
  CONDITION_BRANCH_VERBOSE_COMPONENT,
}

export type SmellMatcher = (ast: any) => ISmell[];