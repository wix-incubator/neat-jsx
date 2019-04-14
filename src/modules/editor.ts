import * as vscode from 'vscode';
import * as path from 'path';
import {QuickPickItem} from 'vscode';

export const workspaceRoot = () => vscode.workspace.rootPath;

export const activeEditor = () => vscode.window.activeTextEditor;

export const config = () => vscode.workspace.getConfiguration('glean');

export function currentEditorPath(): string {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return '';
  }

  const currentFilePath = path.dirname(activeEditor.document.fileName);
  const rootMatcher = new RegExp(`^${workspaceRoot()}`);
  const relativeCurrentFilePath = currentFilePath.replace(rootMatcher, '');

  return relativeCurrentFilePath;
}

export function openFile(absolutePath: string): PromiseLike<string> {
  return vscode.workspace.openTextDocument(absolutePath)
    .then((textDocument) => {
      if (textDocument) {
        vscode.window.showTextDocument(textDocument);
        return absolutePath;
      } else {
        throw Error('Could not open document');
      }
    });
}

export function selectedText(range: vscode.Range) {
  const editor = vscode.window.activeTextEditor;
  return editor.document.getText(range);
}

export function showInputBox(defaultValue, placeHolder) {
  return vscode.window.showInputBox({
    value: defaultValue,
    placeHolder
  });
}


export function showQuickPicksList(choices: QuickPickItem[], placeHolder = '') {
  return vscode.window.showQuickPick<vscode.QuickPickItem>(choices, {
    placeHolder
  });
};

export const convertRelativeToFullPath = relativePath => {
  const root = workspaceRoot();
  return root ? path.join(root, relativePath) : relativePath;
};

export const extractQuickPickValue = selection => {
  if (!selection) {
    return;
  }
  return selection.label;
};

export const toQuickPick = (label: string, description?) => ({label, description});

export const toQuickPicksList = (choices: string[]) => choices.map(item => toQuickPick(item));

export const showErrorMessage = message => vscode.window.showErrorMessage(message);

