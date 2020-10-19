import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'yaml';
import yargs from 'yargs/yargs';

const { slug, title, description, tag: argvTag } = yargs(process.argv).argv as {
  slug?: string;
  title?: string;
  description?: string;
  tag?: string | string[];
};

if (
  !_.isString(slug) ||
  !_.isString(title) ||
  !_.isString(description) ||
  _.isUndefined(argvTag)
) {
  console.log(
    'Usage: create --slug [slug] --title [title] --description [description] --tag [tag] ...',
  );
  process.exit(1);
}

const tags = _.isString(argvTag) ? [argvTag] : argvTag;

const newPostDirPath = path.resolve(
  path.dirname(__dirname),
  'content',
  'blog',
  slug,
);

const newPostMarkdownPath = path.resolve(newPostDirPath, 'index.md');

const frontmatter = yaml.stringify({
  title,
  date: new Date(),
  description,
  tags,
});

const newPostMarkdownContent = `---
${frontmatter}---
`;

console.log(newPostMarkdownContent);

fs.mkdirSync(newPostDirPath);

fs.writeFileSync(newPostMarkdownPath, newPostMarkdownContent);

console.log(`Successfully wrote ${newPostMarkdownPath}`);
process.exit(0);
