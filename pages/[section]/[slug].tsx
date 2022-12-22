import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { getAllSections, getCourseInfo, getLesson } from "../../services";
import { Post, Course } from "../../types";

export interface LessonPageProps {
  post: Post;
  course: Course;
}

export interface LessonPageParams extends ParsedUrlQuery {
  section: string;
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sections = await getAllSections();
  const lessons = sections.map((section) => section.lessons);
  const slugs = lessons.flat().map((lesson) => lesson.fullSlug);

  return { paths: slugs, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { section, slug } = params as LessonPageParams;

  const post = await getLesson(section, slug);
  const course = getCourseInfo();

  return {
    props: {
      post,
      course,
    },
  };
};

const LessonPage: NextPage<LessonPageProps> = ({ post, course }) => {
  return (
    <>
      <Head>
        <title>{`${post.title} - ${course.title}`}</title>
      </Head>
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-3xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {post.title}
        </h1>

        <div className="py-8 mt-6">
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </>
  );
};

export default LessonPage;
