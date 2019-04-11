import {findJsxSmellsInProject} from './findCodeSmells';
import {SmellMatcher, IFileSmells} from '../types';

export const startCleanupFlow = async (smellMatchers: SmellMatcher[]) => {

  const filesCodeSmells = (await findJsxSmellsInProject(smellMatchers)).filter((fileSmell: IFileSmells) => fileSmell.smells.length > 0);
  console.log(filesCodeSmells);

};

export const getSmellMatchers = (): SmellMatcher[] => [];