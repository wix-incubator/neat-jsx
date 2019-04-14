import { findJsxSmellsInProject } from './findCodeSmells';
import { pickCodeSmellsToResolve } from './displayCodeSmells';
import { resolveCodeSmells } from './resolveSelectedSmells';
import { SmellMatcher, ISmell } from '../types';
import * as vscode from 'vscode';

export const startCleanupFlow = async (smellMatchers: SmellMatcher[]) => {

  const projectCodeSmells: ISmell[] = await findJsxSmellsInProject(smellMatchers);
  if (projectCodeSmells.length) {
    const codeSmellsToResolve: ISmell[] = await pickCodeSmellsToResolve(projectCodeSmells);
    if (codeSmellsToResolve.length) {
      await resolveCodeSmells(codeSmellsToResolve);
      vscode.window.showInformationMessage(`Neat Jsx: ${codeSmellsToResolve.length} smells were resolved...`);
    } else {
      vscode.window.showInformationMessage('Neat Jsx: no smells were picked to be resolved...');
    }
  } else {
    vscode.window.showInformationMessage('Neat Jsx: no smells were found...');
  }
  
  
};

export const getSmellMatchers = (): SmellMatcher[] => [];