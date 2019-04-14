import * as vscode from 'vscode';
import {parse, ParserOptions} from "@babel/parser";
import {SmellMatcher, ISmell, SmellType} from '../types';
import traverse from "@babel/traverse";

export const findJsxSmellsInProject = async (smellMatchers: SmellMatcher[]): Promise<ISmell[]> => {
  const files = await vscode.workspace.findFiles('src/**/*.{tsx,jsx}');
  const smellsPerFiles = await Promise.all(
    files.map((fileUri: vscode.Uri) => findJsxSmellsInFile(smellMatchers, fileUri)));
  return smellsPerFiles.reduce((acc, curr) => ([...acc, ...curr]), []);
};

const findJsxSmellsInFile = async (smellMatchers: SmellMatcher[], fileUri: vscode.Uri): Promise<ISmell[]> => {
  const fileAst = await convertFileToAst(fileUri);
  const smells = findJsxCodeSmells(smellMatchers, fileAst, fileUri);
  return smells;
};

const findJsxCodeSmells = (smellMatchers: SmellMatcher[], fileAst: any, fileUri: vscode.Uri) => {
  const smells: ISmell[] = [];
  const Visitor = {
    CallExpression(path: any) {
      if (
        path.node.callee.property &&
        path.node.callee.property.name === 'map' &&
        path.node.arguments[0].type === 'ArrowFunctionExpression' &&
        path.node.arguments[0].body.type === 'JSXElement' &&
        path.node.arguments[0].body.children.length > 0) {
        const jsxElement = path.node.arguments[0].body;
        smells.push({type: SmellType.ARRAY_MAP_TO_VERBOSE_COMPONENT, loc: jsxElement.loc, fileUri});
      }
    },
    LogicalExpression(path: any) {
      if (
        path.node.right.type === 'JSXElement' &&
        path.node.right.children.length > 0) {
        const jsxElement = path.node.right;
        smells.push({type: SmellType.CONDITION_BRANCH_VERBOSE_COMPONENT, loc: jsxElement.loc, fileUri});
      }
    },
    ConditionalExpression(path:any) {
      if (path.node.consequent.type === 'JSXElement' &&
        path.node.consequent.children.length > 0) {
        smells.push({type: SmellType.CONDITION_BRANCH_VERBOSE_COMPONENT, loc: path.node.consequent.loc, fileUri});
      }
      if (path.node.alternate.type === 'JSXElement' &&
        path.node.alternate.children.length > 0) {
        smells.push({type: SmellType.CONDITION_BRANCH_VERBOSE_COMPONENT, loc: path.node.alternate.loc, fileUri});
      }
    },
  };
  traverse(fileAst, Visitor);
  return smells;
  // return smellMatchers
  //   .map((smellMatcher: SmellMatcher) => findAllMatches(smellMatcher, fileAst))
  //   .reduce((acc: ISmell[], curr: ISmell[]): ISmell[] => [...acc, ...curr], []);
};

const convertFileToAst = async (fileUri: vscode.Uri) => {
  const doc = await vscode.workspace.openTextDocument(fileUri);
  return codeToAst(doc.getText());
};

const findAllMatches = (smellMatcher: SmellMatcher, fileAst: any): ISmell[] => {
  return [];
};

const codeToAst = (code: string) => {
  const parsingOptions = {
    plugins: ["objectRestSpread", "classProperties", "typescript", "jsx", "decorators-legacy", "dynamicImport"],
    sourceType: "module",
  };
  return parse(code, <ParserOptions>{
    startLine: 0,
    ...parsingOptions
  });


};
