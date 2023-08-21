import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Tale } from "@/tales/tale-type";
import { escape } from "querystring";

export const getTalesDirectory = (lang: "en" | "ja") =>
  path.join(process.cwd(), `tales/${lang}`);

export async function getTaleByMarkdown(fileName: string, lang: "en" | "ja") {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(getTalesDirectory(lang), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const escapedHtml = escape(processedContent.toString());

  return {
    id,
    escapedHtml,
    ...matterResult.data,
  } as Tale;
}
