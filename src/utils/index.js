export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
export const pipe = (...fns) =>
  fns.reduceRight((f, g) => (...args) => f(g(...args)));

export const isDevEnv = () =>
  process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith("dev");
