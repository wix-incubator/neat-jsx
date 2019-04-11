import { findJsxSmellsInProject } from './findCodeSmells';
import { SmellMatcher } from '../types';

export const startCleanupFlow = async(smellMatchers:SmellMatcher[]) => {

  const filesCodeSmells = await findJsxSmellsInProject(smellMatchers);
  console.log(filesCodeSmells);
  
};

export const getSmellMatchers = ():SmellMatcher[] => [];