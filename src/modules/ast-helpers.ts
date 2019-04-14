import * as t from "@babel/types";

export function getReactImportReference(ast:any): t.ImportDeclaration {
  return ast.program.body.find((statement:any) => {
    return (
      t.isImportDeclaration(statement) && statement.source.value === "react"
    );
  });
}

export function isExportedDeclaration(ast:any) {
  return t.isExportNamedDeclaration(ast) || t.isExportDefaultDeclaration(ast);
}
