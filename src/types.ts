import * as vscode from 'vscode';
import {SourceLocation} from '@babel/types';

export interface ISmell {
  type: SmellType;
  loc:SourceLocation;
  fileUri: vscode.Uri;
}

export enum SmellType {
  ARRAY_MAP_TO_VERBOSE_COMPONENT,
  CONDITION_BRANCH_VERBOSE_COMPONENT,
}

export type SmellMatcher = (ast: any) => ISmell[];