export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
export const pipe = (...fns) =>
  fns.reduceRight((f, g) => (...args) => f(g(...args)));

export const isDevEnv = () =>
  process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith("dev");

// debug function to pretty print elements
export function getNames(child) {
  if (Array.isArray(child)) {
    return child.map(getNames);
  }

  if (typeof child != "object") {
    if (!child) debugger;
    return child;
  }

  const name = child.type.displayName || child.type.name || child.type;
  if (!name) debugger;
  const props = Object.entries(child.props).reduce(
    (list, [attr, val]) =>
      attr == "children" ? list : [attr + "=" + JSON.stringify(val), ...list],
    [],
  );
  const children = child.props.children ? getNames(child.props.children) : "";
  return `<${name} ${props.join(" ")}>\n\t${children}\n</${name}>`;
}
