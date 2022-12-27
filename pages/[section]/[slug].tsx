import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GdButton } from "../../components/buttons";
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
        <meta name="description" content={course.description} />
        <meta name="keywords" content={course.keywords?.join(",")} />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://giadinhlaptrinh.github.io/git-tutorial"
        />
        <meta
          property="og:site_name"
          content={`${post.title} - ${course.title}`}
        />
        <meta property="og:title" content={`${post.title} - ${course.title}`} />
        <meta property="og:description" content={course.description} />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/images/cover-v2.png`}
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://giadinhlaptrinh.github.io/git-tutorial"
        />
        <meta
          property="twitter:title"
          content={`${post.title} - ${course.title}`}
        />
        <meta
          property="twitter:description"
          content={`${post.title} - ${course.title}`}
        />
        <meta
          property="twitter:image"
          content={`${process.env.BASE_URL}/images/cover-v2.png`}
        />
        <meta name="twitter:creator" content="truonghungit" />
      </Head>

      <div className="max-w-3xl mx-auto py-10 lgpy-12 px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
          {post.title}
        </h1>

        <div className="my-10">
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="flex justify-between mt-10">
            <span>
              {post.prevSlug && (
                <a href={post.prevSlug}>
                  <GdButton
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    <ChevronLeftIcon className="h-5 mr-2" />
                    Previous
                  </GdButton>
                </a>
              )}
            </span>

            <span>
              {post.nextSlug && (
                <a href={post.nextSlug}>
                  <GdButton
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    Next
                    <ChevronRightIcon className="h-5 ml-2" />
                  </GdButton>
                </a>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPage;
