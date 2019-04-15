import {ComponentProperties} from "./jsx";

function buildFunctionalComponent(name, code, attributes: ComponentProperties) {
  const props = new Set([
    ...attributes.argumentProps,
    ...attributes.componentMembers,
    ...attributes.memberProps,
    ...attributes.state

  ]);
  return `
    export const ${name} = ({${Array.from(props).join(", ")}}) => {
      return (${code});
    }
  `;
}

export function buildComponent(name, code, attributes) {
  return buildFunctionalComponent(name, code, attributes);
}
