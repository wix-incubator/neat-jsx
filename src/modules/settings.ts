import * as path from 'path';
import {config} from './editor';

export const shouldBeConsideredJsFiles = (...files) => {
  const extentionsToBeConsideredJS = ["js", "jsx", "ts", "tsx"];
  return files.every(file => extentionsToBeConsideredJS.includes(path.extname(file).replace('.', '')));
};

export const commonJSModuleSystemUsed = () => config().jsModuleSystem === 'commonjs';

export const esmModuleSystemUsed = () => true;

export const shouldSwitchToTarget = () => config().switchToTarget;
