import { titleCase } from "title-case";

export function slugify(path: string): {
  slug: string;
  title: string;
  order: string;
} {
  const pathParts = path.split("-");
  const order = pathParts.shift() || '';
  const slug = pathParts.join("-");

  const title = titleCase(pathParts.join(" "));

  return {
    slug,
    order,
    title
  };
}

export function getTitle(slug: string, override?: string) {
  let title = override;
  if (!title) {
    title = titleCase(slug.split("-").join(" "));
  }

  return title;
}

