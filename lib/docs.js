import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), 'docs');

export function getAllDocSlugs() {
  const fileNames = fs.readdirSync(docsDirectory);
  return fileNames
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.(mdx|md)$/, ''),
    }));
}

export async function getDocBySlug(slug) {
  const mdxPath = path.join(docsDirectory, `${slug}.mdx`);
  const mdPath = path.join(docsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: data.title || slug,
    description: data.description || '',
    ...data,
  };
}

export function getAllDocs() {
  const fileNames = fs.readdirSync(docsDirectory);
  return fileNames
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const excerpt = content.replace(/[#*`>]/g, '').slice(0, 160).trim() + '...';
      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        description: data.description || excerpt,
        ...data,
      };
    });
}
