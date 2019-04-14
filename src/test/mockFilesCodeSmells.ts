import { SmellType, ISmell } from "../types";
import {Uri} from 'vscode';

export const mockFilesCodeSmells = (): ISmell[] => {
  return [
        {
          fileUri: Uri.file('/src/Components/Comp1.tsx'),
          type: SmellType.ARRAY_MAP_TO_VERBOSE_COMPONENT,
          loc: {start: {line: 6, column:12}, end: {line: 25, column: 13}}
        },
        {
          fileUri: Uri.file('/src/Components/Comp1.tsx'),
          type: SmellType.ARRAY_MAP_TO_VERBOSE_COMPONENT,
          loc: {start: {line: 12, column:12}, end: {line: 18, column: 13}}
        },
        {
          fileUri: Uri.file('/src/Components/Comp1.tsx'),
          type: SmellType.CONDITION_BRANCH_VERBOSE_COMPONENT,
          loc: {start: {line: 32, column:12}, end: {line: 44, column: 13}}
        },
        {
          fileUri: Uri.file('/src/Components/Comp2.tsx'),
          type: SmellType.ARRAY_MAP_TO_VERBOSE_COMPONENT,
          loc: {start: {line:12, column:12}, end: {line: 44, column: 13}}
        },
  ];
};
