import * as vscode from 'vscode';
import * as path from 'path';
import { config } from './editor';

export const shouldBeConsideredJsFiles = (...files) => {
    console.log(files);

    const extentionsToBeConsideredJS =  [ "js", "jsx", "ts", "tsx" ];
    return files.every(file => extentionsToBeConsideredJS.includes(path.extname(file).replace('.', '')));
}

export const commonJSModuleSystemUsed = () => config().jsModuleSystem === 'commonjs'

const isExperimentOn = (experiment) => (config().experiments || []).includes(experiment);

export const isHooksForFunctionalComponentsExperimentOn = () => isExperimentOn('hooksForFunctionalComponents');

export const esmModuleSystemUsed = () => true;

export const shouldSwitchToTarget = () => config().switchToTarget;
