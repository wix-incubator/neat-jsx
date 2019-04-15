import {openFile, showErrorMessage} from "./editor";
import {shouldSwitchToTarget, shouldBeConsideredJsFiles} from "./settings";
import {replaceTextInFile, appendTextToFile, prependTextToFile} from "./file-system";
import {getIdentifier, generateImportStatementFromFile, transformJSIntoExportExpressions} from "./parsing";
import * as relative from 'relative';
import * as path from 'path';
import {Range} from "vscode";

export async function switchToDestinationFileIfRequired(destinationFilePath: any) {
  if (shouldSwitchToTarget()) {
    await openFile(destinationFilePath);
  }
}

export function replaceSelectionWith(text: string, filename: string, range: Range) {
  return replaceTextInFile(text, range.start, range.end, filename);
}

export type ProcessedSelection = {
  text: string;
  metadata: any;
};

export const appendSelectedTextToFile = (code, destinationPath, originPath) => {
  let text;
  if (isOperationBetweenJSFiles(destinationPath, originPath)) {
    text = transformJSIntoExportExpressions(code);
  } else {
    text = code;
  }
  return appendTextToFile(`
${text}
  `, destinationPath);
};

export const prependImportsToOriginFileIfNeeded = (
  code,
  destinationFilePath,
  originFilePath) => {
  if (!isOperationBetweenJSFiles(destinationFilePath, originFilePath)) {
    return;
  }
  const identifiers = getIdentifier(code);
  const destinationPathRelativeToOrigin = relative(originFilePath, destinationFilePath);
  const destinationFileName = path.parse(destinationPathRelativeToOrigin).name;
  const destinationModule = [...destinationPathRelativeToOrigin.split('/').slice(0, -1), destinationFileName].join('/');
  const importStatement = generateImportStatementFromFile(identifiers, destinationModule);
  return prependTextToFile(importStatement, originFilePath);
};

export const isOperationBetweenJSFiles = (destinationPath, originPath) => shouldBeConsideredJsFiles(originPath, destinationPath);

export const handleError = e => {
  if (e) {
    showErrorMessage(e.message);
  }
};
