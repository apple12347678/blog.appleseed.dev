import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'yaml';
import yargs from 'yargs/yargs';

const { slug, lang = 'ko' } = yargs(process.argv).argv as {
  slug?: string;
  lang?: string;
};

if (!_.isString(slug)) {
  console.log('Usage: create --slug [slug]');
  process.exit(1);
}

const newPostDirPath = path.resolve(
  path.dirname(__dirname),
  'content',
  'post',
  slug,
);

const newPostMarkdownPath = path.resolve(newPostDirPath, `${lang}.md`);

const frontmatter = yaml.stringify({
  title: '',
  date: new Date(),
  description: '',
  tags: [],
});

const newPostMarkdownContent = `---
${frontmatter}---
`;

console.log(newPostMarkdownContent);

fs.mkdirSync(newPostDirPath);

fs.writeFileSync(newPostMarkdownPath, newPostMarkdownContent);

console.log(`Successfully wrote ${newPostMarkdownPath}`);
process.exit(0);
