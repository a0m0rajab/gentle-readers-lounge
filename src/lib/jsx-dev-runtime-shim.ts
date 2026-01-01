import { jsx, jsxs, Fragment } from "react/jsx-runtime";

// Vite/MDX can occasionally emit `jsxDEV` calls even in a production bundle.
// React's `react/jsx-runtime` does not export `jsxDEV`, so we provide a small
// compatible shim that maps `jsxDEV` to `jsx`.
//
// Signature loosely matches React's jsxDEV runtime; extra args are ignored.
export function jsxDEV(
  type: any,
  props: any,
  key?: any,
  _isStaticChildren?: boolean,
  _source?: any,
  _self?: any
) {
  return jsx(type, props, key);
}

export { jsx, jsxs, Fragment };
