import Head from "next/head";
import {
  PlayCircleIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { GdBadge } from "../components/badges";
import { GdButton } from "../components/buttons";
import GdDisclosure from "../components/disclosures";
import { Course, Section } from "../types";

import { getCourseInfo, getAllSections } from "../services";

export interface HomePageProps {
  course: Course;
  sections: Array<Section>;
}

export const getStaticProps: GetStaticProps = async () => {
  const sections: Array<Section> = await getAllSections();
  const course = getCourseInfo();

  return {
    props: {
      sections,
      course,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({ course, sections = [] }) => {
  return (
    <>
      <Head>
        <title>{course.title}</title>
        <meta name="description" content={course.description} />
        <meta name="keywords" content={course.keywords?.join(",")} />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://giadinhlaptrinh.github.io/git-tutorial"
        />
        <meta property="og:site_name" content={course.title} />
        <meta property="og:title" content={course.title} />
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
        <meta property="twitter:title" content={course.title} />
        <meta property="twitter:description" content={course.description} />
        <meta
          property="twitter:image"
          content={`${process.env.BASE_URL}/images/cover-v2.png`}
        />
        <meta name="twitter:creator" content="truonghungit" />
      </Head>

      <main>
        <section className="px-4 bg-[#ffd300]">
          <div className="max-w-5xl mx-auto py-16">
            <div className="flex gap-4">
              <GdBadge>Free</GdBadge>
              <div>Course</div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-semibold mt-6 text-gray-900">
              {course.title}
            </h1>
            <p className="mt-6 text-lg w-full md:w-3/4">{course.subTitle}</p>

            <div className="mt-10">
              <GdButton>B???t ?????u ngay</GdButton>
            </div>
          </div>
        </section>

        <section className="px-4 mt-12">
          <div className="max-w-5xl flex flex-col lg:flex-row gap-10 mx-auto">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-medium">T???ng quan kh??a h???c</h2>

              <p className="mt-5">{course.description}</p>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-medium">Y??u c???u</h2>

              <ul className="mt-5 flex flex-col gap-y-3">
                {course.requiredSkills.map((skill, index) => (
                  <li className="flex " key={index}>
                    <PlusIcon className="h-6 mr-3 flex-shrink-0" />
                    <div>{skill}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 mt-12">
          <div className="max-w-5xl mx-auto lg:p-8 lg:border border-gray-500">
            <h2 className="text-2xl font-medium">
              Ch??ng ta s??? ?????t ???????c nh???ng g?? sau kh??a h???c n??y
            </h2>

            <ul className="mt-5 grid gap-x-10 gap-y-3 grid-cols-1 lg:grid-cols-2">
              {course.skills.map((skill, index) => (
                <li className="flex justify-start " key={index}>
                  <CheckIcon className="h-6 mr-3 flex-shrink-0" />
                  <div>{skill}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-0 lg:px-4 mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
              <div className="px-4 lg:px-0">
                <h2 className="text-2xl font-medium">
                  N???i dung chi ti???t kh??a h???c
                </h2>
              </div>
            </div>

            <div className="mt-4 divide-y divide-gray-500 border-t border-b lg:border border-gray-500">
              {sections.map((section) => (
                <GdDisclosure key={section.slug}>
                  <GdDisclosure.Header>
                    <h3 className="lg:text-xl font-medium lg:font-semibold">
                      {section.title}
                    </h3>
                    <p className="mt-2 font-light">{section.description}</p>
                  </GdDisclosure.Header>
                  <GdDisclosure.Content>
                    {section.lessons.map((lesson) => (
                      <div key={lesson.slug} className="pl-2 lg:pl-5 pr-2 py-3">
                        <div className="flex gap-3">
                          <PlayCircleIcon className="h-6 flex-shrink-0" />
                          <span className="flex-grow hover:text-indigo-700">
                            <Link href={lesson.fullSlug}>
                              <h4>{lesson.title}</h4>
                            </Link>
                          </span>
                          <div className="flex-shrink-0">04:30</div>
                        </div>
                      </div>
                    ))}
                  </GdDisclosure.Content>
                </GdDisclosure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 mt-12 bg-[#10162f]">
          <div className="max-w-2xl mx-auto py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold lg:leading-tight text-gray-100">
              T???t c??? ?????u mi???n ph??
            </h2>
            <p className="mt-4 lg:text-xl font-medium lg:font-semibold lg:leading-tight text-gray-200">
              Kh??a h???c ho??n to??n mi???n ph?? d??nh cho t???t c??? m???i ng?????i, h???c m???i l??c
              m???i n??i tr??n Youtube.
            </p>

            <a target="_blank" rel="noreferrer" href={course.social.playlist}>
              <GdButton variant="secondary" className="mt-10">
                Xem tr??n Youtube
              </GdButton>
            </a>
          </div>
        </section>

        <section className="px-4 bg-[#ffd300]">
          <div className="max-w-6xl mx-auto py-16">
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
              <div className="w-full lg:w-6/12 flex-shrink-0">
                <h2 className="text-3xl lg:text-4xl font-semibold lg:leading-tight text-gray-900">
                  Tham gia c??ng b???n b?? tr??n kh???p th??? gi???i v?? b???t ?????u h???c s??? d???ng
                  Git ngay h??m nay
                </h2>
              </div>

              <div className="w-full lg:w-5/12 mb-8 lg:mb-0 flex justify-center lg:justify-end items-center">
                <img
                  className="w-4/5"
                  src={`${process.env.BASE_URL}/images/girl-enjoying-reading.png`}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
