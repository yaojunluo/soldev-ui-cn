import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/core/sidebar.module.css";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import heroStyles from "@/styles/PageHero.module.css";
import PageHero from "@/components/core/PageHero";

import subnavStyles from "@/styles/core/subnav.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { SIMDAuthorLineItem } from "@/components/simd/SIMDTableLineItem";
import NextPrevButtons from "@/components/core/NextPrevButtons";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: "SIMD doc page",
  description: "",
};

// define the indexes for the tabbed page sections
const TABS = {
  content: 0,
  details: 1,
};

// this is a temporary data record to simulate getServerSideProps
const simd = {
  id: 0,
  title: "Lockout Violation Detection",
  href: "/simd/000-lockout-violation-detection",
  githubLink:
    "https://github.com/solana-foundation/solana-improvement-documents/pull/9",
  authors: [
    {
      name: "carllin",
      link: "https://github.com/carllin",
    },
    "ashwinsekar",
    "wencoding",
  ],
  date: "2022-12-12",
  type: "core",
  status: "draft",
};

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(TABS.content);

  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container text-center">
        <h1>
          <Link href={simd.href} className="hover:underline">
            {simd.title}
          </Link>
        </h1>

        <section className={heroStyles.ctaSection}>
          <Link
            href={"/simd"}
            className={`btn btn-default ${heroStyles.ctaBtn}`}
          >
            {/* <ArrowLeftIcon className="icon" /> */}
            Back to SIMD
          </Link>
          <Link href={"#"} className={`btn btn-dark ${heroStyles.ctaBtn}`}>
            Share on twitter
            {/* <ArrowTopRightOnSquareIcon className="icon" /> */}
          </Link>
        </section>
      </PageHero>

      <nav className={clsx(subnavStyles.subnav, subnavStyles.mobileOnly)}>
        <Link
          href={"#content"}
          onClick={() => setSelectedTab(TABS.content)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.content && subnavStyles.activeButton,
            // "w-1/2 text-center",
          )}
        >
          Content
        </Link>
        <Link
          href={"#details"}
          onClick={() => setSelectedTab(TABS.details)}
          className={clsx(
            subnavStyles.item,
            selectedTab === TABS.details && subnavStyles.activeButton,
            // "w-1/2 text-center",
          )}
        >
          Details
        </Link>
      </nav>

      <section className={styles.wrapper + " container-inner"}>
        <section
          className={clsx(
            styles.leftSideLarge,
            selectedTab === TABS.content
              ? subnavStyles.activeTab
              : subnavStyles.inActiveTab,
          )}
        >
          <article>content</article>

          <NextPrevButtons
            nextHref="#"
            prevHref="#"
            nextLabel="Next SIMD"
            prevLabel="Previous SIMD"
          />
        </section>

        <aside className={styles.rightSideSmall + " " + styles.borderLeft}>
          <section
            className={clsx(
              styles.section,
              selectedTab === TABS.details
                ? subnavStyles.activeTab
                : subnavStyles.inActiveTab,
            )}
          >
            <h3>Details</h3>

            {/* <p className={styles.minorText}>optional minor text</p> */}

            <ul className="text-gray-500 md:text-sm">
              <li>
                SIMD: #<span>{simd.id}</span>
              </li>
              <li>Created: {simd.date}</li>
              <li>Title: {simd.title}</li>
              <li>Type: {simd.type}</li>
              <li>Status: {simd.status}</li>
              <li>
                <p>Authors:</p>
                <ul className="pl-8 list-disc">
                  {simd.authors.map((author, id) => (
                    <SIMDAuthorLineItem key={id} author={author} />
                  )) || <li>no authors found</li>}
                </ul>
              </li>
            </ul>
          </section>
        </aside>
      </section>
    </DefaultLayout>
  );
}