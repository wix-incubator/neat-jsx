import {SmellMatcher} from '../types';
import {extractJSXToComponentToFile} from '../modules/extract-to-component';
import {Range, Position} from 'vscode';
import { findJsxSmellsInProject } from './findCodeSmells';
import { displayFilesCodeSmells } from './displayCodeSmells';
import { SmellMatcher, ISmell } from '../types';
import { mockFilesCodeSmells } from '../test/mockFilesCodeSmells';

export const startCleanupFlow = async (smellMatchers: SmellMatcher[]) => {

  // const filesCodeSmells: ISmell[] = await findJsxSmellsInProject(smellMatchers);

  const filesCodeSmells: ISmell[] = mockFilesCodeSmells();
  await displayFilesCodeSmells(filesCodeSmells);
  
};



export const getSmellMatchers = (): SmellMatcher[] => [];