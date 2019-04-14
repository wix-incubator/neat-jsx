import {codeToAst} from "./parsing";
import {transformFromAst} from "@babel/core";
import * as t from "@babel/types";
import {readFileContent, prependTextToFile} from "./file-system";
import {getReactImportReference} from "./ast-helpers";

export type ComponentProperties = {
  argumentProps: Set<string>;
  memberProps: Set<string>;
  state: Set<string>;
  componentMembers: Set<string>;
};

export async function importReactIfNeeded(filePath) {
  const file = readFileContent(filePath);
  const ast = codeToAst(file);

  const reactImport = getReactImportReference(ast);

  if (!reactImport) {
    ast.program.body.unshift(
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier("React"))],
        t.stringLiteral("react")
      )
    );
  }
  const code = transformFromAst(ast).code;

  return prependTextToFile(code, filePath);
}

