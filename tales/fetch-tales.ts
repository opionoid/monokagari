import fs, { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const getTalesDirectory = (lang: string) => path.join(process.cwd(), `tales/${lang}`);

export type Tale = {
  id: string;
  date: string;
  title: string;
  description: string;
  contentHtml: string;
};

async function getTaleByMarkdown (fileName: string, lang: string) {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(getTalesDirectory(lang), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as Tale;
};

export async function getSortedTales(lang: string) {
  const fileNames = fs.readdirSync(getTalesDirectory(lang));
  const allTales = await Promise.all(fileNames.map(async (fileName) => {
    const tales = await getTaleByMarkdown(fileName, lang)
    return tales
  }));
  return allTales.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllTaleIds(lang: string) {
  const fileNames = readdirSync(getTalesDirectory(lang));
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getTale(id: string, lang: string) {
  const tale = await getTaleByMarkdown(`${id}.md`, lang);
  return tale;
}
