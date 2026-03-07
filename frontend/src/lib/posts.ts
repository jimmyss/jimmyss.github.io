import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

function postsDirectoryExists(): boolean {
  try {
    return fs.existsSync(postsDirectory);
  } catch {
    return false;
  }
}

export function getAllPostMetas(): PostMeta[] {
  if (!postsDirectoryExists()) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((f) => f.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? '',
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? '',
    },
    content,
  };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
