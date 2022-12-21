export type Lesson = {
  title: string;
  subTitle?: string;
  slug: string;
  fullSlug: string;
  description?: string;
  order?: string;
  path?: string;
  socialLinks?: {
    github?: string;
    youtube?: string;
  },
}

export type Post = {
  attributes: any;
  html: any;
  sectionTitle: string;
  title: string;
  subTitle?: string;
  slug: string;
  description?: string;
  order?: string;
  filePath?: string;
  socialLinks?: {
    github?: string;
    youtube?: string;
  },
}


export type Section = {
  title: string;
  slug?: string;
  subTitle?: string;
  description?: string;
  order?: string;
  socialLinks?: {
    github?: string;
    youtube?: string;
  },
  lessons: Array<Lesson>
}