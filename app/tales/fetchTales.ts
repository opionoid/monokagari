import fs, { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const talesDirectory = path.join(process.cwd(), "tales");

export type Tale = {
  id: string;
  date: string;
  title: string;
  description: string;
  contentHtml: string;
};

async function getTaleByMarkdown (fileName: string) {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(talesDirectory, fileName);
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

export async function getSortedTales() {
  const fileNames = fs.readdirSync(talesDirectory);
  const allTales = await Promise.all(fileNames.map(async (fileName) => {
    const tales = await getTaleByMarkdown(fileName)
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

export function getAllTaleIds() {
  const fileNames = readdirSync(talesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getTale(id: string) {
  const tale = await getTaleByMarkdown(`${id}.md`);
  return tale;
}
