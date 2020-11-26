/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vfile-message' {
  export type VFileMessage = any;
}

declare module '*.png' {
  const Image: string;
  export default Image;
}

declare module '*.svg' {
  const Vector: (props: React.SVGProps<React.ReactSVG>) => React.ReactElement;
  export default Vector;
}
