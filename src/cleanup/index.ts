import { findJsxSmellsInProject } from './findCodeSmells';

export const startCleanupFlow = async(smellMatchers) => {
  const codeSmells = await findJsxSmellsInProject(smellMatchers);
};

export const getSmellMatchers = () => [];