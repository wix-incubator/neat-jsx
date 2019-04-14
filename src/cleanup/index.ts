import {displayFilesCodeSmells} from './displayCodeSmells';
import {SmellMatcher, ISmell} from '../types';
import {mockFilesCodeSmells} from '../test/mockFilesCodeSmells';

export const startCleanupFlow = async (smellMatchers: SmellMatcher[]) => {

  // const filesCodeSmells: ISmell[] = await findJsxSmellsInProject(smellMatchers);

  const filesCodeSmells: ISmell[] = mockFilesCodeSmells();
  await displayFilesCodeSmells(filesCodeSmells);

};


export const getSmellMatchers = (): SmellMatcher[] => [];