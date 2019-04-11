import { findJsxSmellsInProject } from './findCodeSmells';

export const startCleanupFlow = async(smellMatchers:(()=>object)[]) => {

  const codeSmells = await findJsxSmellsInProject(smellMatchers);
  console.log(codeSmells);
  
};

export const getSmellMatchers = ():(()=>object)[] => [];