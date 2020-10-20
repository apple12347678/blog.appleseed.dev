import 'prismjs/themes/prism.css';
import { Layout, RootProvider } from './src/components';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
