import Link from 'next/link';
import { SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

const resourceCategories = [
  {
    title: 'Getting started',
    description: 'Start here if you are new to STAYCT and want the shortest path to understanding the platform.',
  },
  {
    title: 'Search and discovery',
    description: 'Use these resources when you are comparing cities, stay types, or search paths.',
  },
  {
    title: 'Operator workflows',
    description: 'Read these when you want a clear view of how STAYCT supports property operations.',
  },
];

const guideCards = [
  'How to choose the right stay category',
  'How to start with city-first discovery',
  'How operators can structure their first STAYCT conversation',
];

const faqItems = [
  {
    question: 'Who is STAYCT for?',
    answer: 'People searching for accommodation and operators managing rental inventory.',
  },
  {
    question: 'Where should a new visitor start?',
    answer: 'Use search if you already know the city or stay type. Use cities if location is the first decision.',
  },
  {
    question: 'What should an operator do next?',
    answer: 'Use the operators page to understand the workflow, then contact STAYCT for the next discussion.',
  },
];

export const metadata = buildPageMetadata(SITE_PAGES.resources);

export default function ResourcesPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Resources</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            Use this page to learn how to navigate STAYCT with less guesswork.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            These resources are concise by design. They point users toward the next meaningful page instead of leaving
            them in a content dead end.
          </p>
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">Resource categories</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {resourceCategories.map((item) => (
              <div key={item.title} className="rounded-[18px] border border-stayct-border bg-white p-6">
                <div className="text-[17px] font-black text-stayct-green-dark">{item.title}</div>
                <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Guides</h2>
            <div className="mt-5 space-y-3">
              {guideCards.map((guide) => (
                <div key={guide} className="rounded-[16px] bg-stayct-bg-light px-5 py-4">
                  <div className="text-[15px] font-bold text-stayct-green-dark">{guide}</div>
                  <div className="mt-1 text-[14px] leading-[1.65] text-stayct-green-medium">
                    Use this topic as a quick learning prompt, then continue into the linked route that matches the goal.
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={ROUTES.search}
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Explore search
              </Link>
              <Link
                href={ROUTES.operators}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Explore operators
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">FAQ</h2>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[16px] border border-stayct-border bg-white px-5 py-4">
                  <div className="text-[15px] font-bold text-stayct-green-dark">{item.question}</div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SupportContactCard description="If the guides do not answer your question, contact STAYCT support and explain what you were trying to find." />
      </div>
    </main>
  );
}
