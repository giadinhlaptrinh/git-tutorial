import path from "path"
import { readdir, readFile, lstat } from "fs/promises"
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";
import { getTitle, slugify } from "./utils";
import { Lesson, Post, Section } from "../types";

const lessonsPath = path.join(process.cwd(), "lessons");

type SectionMetadata = {
  title?: string;
  subTitle?: string;
  description?: string;
  socialLinks?: {
    github?: string;
    youtube?: string;
  },
}


async function getSectionMetadata(sectionDirectoryName: string): Promise<SectionMetadata> {
  let meta: SectionMetadata = {};
  try {
    const filePath = path.join(lessonsPath, sectionDirectoryName, "meta.json");

    const file = await readFile(filePath);
    meta = JSON.parse(file.toString());
  } catch (e) {
    console.log(e);
  }

  return meta;
}

marked.setOptions({
  baseUrl: process.env.BASE_URL ? process.env.BASE_URL + "/" : "/",
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

export async function getAllSections() {

  const sections: Array<Section> = [];
  const sectionDirectoryNames = await readdir(lessonsPath);

  for (let sectionDirectoryName of sectionDirectoryNames) {
    const dirStats = await lstat(path.join(lessonsPath, sectionDirectoryName));
    if (dirStats.isFile()) {
      continue;
    }

    let {
      title: sectionTitle,
      order: sectionOrder,
      slug: sectionSlug,
    } = slugify(sectionDirectoryName);

    const {
      subTitle: sectionSubTitle,
      description: sectionDescription,
      socialLinks: sectionSocialLinks,
      ...sectionMetadata
    } = await getSectionMetadata(sectionDirectoryName);
    if (sectionMetadata.title) {
      sectionTitle = sectionMetadata.title;
    }

    const lessonFileNames = await readdir(path.join(lessonsPath, sectionDirectoryName));

    const lessons: Array<Lesson> = [];
    for (let lessonFileName of lessonFileNames) {
      if (lessonFileName.slice(-3) !== ".md") {
        continue;
      }

      const lessonFilePath = path.join(lessonsPath, sectionDirectoryName, lessonFileName);

      const file = await readFile(lessonFilePath);
      const { data: lessonData } = matter(file.toString());
      let lessonSlug = lessonFileName.replace(/\.md$/, "");

      const slugParts = lessonSlug.split("-");
      const lessonOrder = slugParts.shift();

      lessonSlug = slugParts.join("-");

      const title = getTitle(lessonSlug, lessonData.title);

      lessons.push({
        title,
        slug: lessonSlug,
        fullSlug: `/${sectionSlug}/${lessonSlug}`,
        order: `${sectionOrder}${lessonOrder?.toUpperCase()}`,
        path: lessonFilePath,
        description: lessonData.description ? lessonData.description : "",
      });
    }

    sections.push({
      title: sectionTitle,
      subTitle: sectionSubTitle ?? "",
      description: sectionDescription ?? "",
      socialLinks: sectionSocialLinks ?? {},
      slug: sectionSlug,
      order: sectionOrder,
      lessons,
    });
  }

  return sections;
}


export async function getLesson(directoryTarget: string, fileTarget: string): Promise<Post | false> {
  const sectionDirectoryNames = await readdir(lessonsPath);

  for (let i = 0; i < sectionDirectoryNames.length; i++) {
    const sectionDirectoryName = sectionDirectoryNames[i];

    if (sectionDirectoryName.endsWith(directoryTarget)) {

      const lessonFileNames = (await readdir(path.join(lessonsPath, sectionDirectoryName))).filter((str) => str.endsWith(".md"));

      for (let j = 0; j < lessonFileNames.length; j++) {
        const slugPath = lessonFileNames[j];
        if (slugPath.endsWith(fileTarget + ".md")) {
          const lessonFilePath = path.join(lessonsPath, sectionDirectoryName, slugPath);
          const fileData = await readFile(lessonFilePath);
          const { data: lessonData, content } = matter(fileData.toString());
          const lessonHtml = marked(content);
          const lessonTitle = getTitle(fileTarget, lessonData.title);

          const sectionMetadata = await getSectionMetadata(sectionDirectoryName);
          const sectionTitle = getTitle(directoryTarget, sectionMetadata.title);

          // let nextSlug;
          // let prevSlug;

          // get next
          // if (lessonFileNames[j + 1]) {
          //   // has next in section
          //   const { slug: next } = slugify(lessonFileNames[j + 1]);
          //   nextSlug = `${directoryTarget}/${next.replace(/\.md$/, "")}`;
          // } else if (sectionDirectoryNames[i + 1]) {
          //   // has next in next section
          //   const nextDir = (
          //     await readdir(path.join(lessonsPath, sectionDirectoryNames[i + 1]))
          //   ).filter((str) => str.endsWith(".md"));
          //   const nextDirSlug = slugify(sectionDirectoryNames[i + 1]).slug;
          //   const nextLessonSlug = slugify(nextDir[0]).slug.replace(
          //     /\.md$/,
          //     ""
          //   );
          //   nextSlug = `${nextDirSlug}/${nextLessonSlug}`;
          // } else {
          //   // last section
          //   nextSlug = null;
          // }

          // get prev
          // if (lessonDir[j - 1]) {
          //   // has prev in section
          //   const { slug: prev } = slugify(lessonDir[j - 1]);
          //   prevSlug = `${directoryTarget}/${prev.replace(/\.md$/, "")}`;
          // } else if (sectionDirectoryNames[i - 1]) {
          //   // has prev in prev section
          //   const prevDir = (
          //     await fs.readdir(path.join(lessonsPath, sectionDirectoryNames[i - 1]))
          //   ).filter((str) => str.endsWith(".md"));
          //   const prevDirSlug = slugify(sectionDirectoryNames[i - 1]).slug;
          //   const prevLessonSlug = slugify(
          //     prevDir[prevDir.length - 1]
          //   ).slug.replace(/\.md$/, "");
          //   prevSlug = `${prevDirSlug}/${prevLessonSlug}`;
          // } else {
          //   // first section
          //   prevSlug = null;
          // }

          return {
            attributes: lessonData,
            html: lessonHtml,
            slug: fileTarget,
            title: lessonTitle,
            sectionTitle,
            filePath: lessonFilePath
          };
        }
      }
    }
  }

  return false;
}

