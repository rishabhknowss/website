import React from 'react';
import { DocsHelp } from '~/components/DocsHelp';
import { getLayout } from '~/components/Sidebar';
import Head from 'next/head';
import { Headline1 } from '~/components/Headlines';
import { SectionContext } from '~/context';
import roadmap from '~/data/roadmap.json';

const statusColors = {
  'In Progress': 'bg-green-600 text-white dark:bg-green-500',
  Done: 'bg-purple-600 text-white dark:bg-purple-500',
  Planned: 'bg-blue-600 text-white dark:bg-blue-500',
  Paused: 'bg-red-600 text-white dark:bg-red-500',
  Deferred: 'bg-blue-600 text-white dark:bg-blue-500',
  Unknown: 'bg-gray-600 text-white dark:bg-gray-500',
};

const effortColors = {
  Low: 'bg-green-600 text-white dark:bg-green-500',
  Medium: 'bg-yellow-600 text-white dark:bg-yellow-500',
  High: 'bg-red-600 text-white dark:bg-red-500',
  'Low-medium': 'bg-green-600 text-white dark:bg-green-500',
  Unknown: 'bg-gray-600 text-white dark:bg-gray-500',
};

const impactColors = {
  Low: 'bg-red-600 text-white dark:bg-red-500',
  Medium: 'bg-yellow-600 text-white dark:bg-yellow-500',
  High: 'bg-green-600 text-white dark:bg-green-500',
  'Medium-high': 'bg-yellow-600 text-white dark:bg-yellow-500',
  'Low-medium': 'bg-red-600 text-white dark:bg-red-500',
  Unknown: 'bg-gray-600 text-white dark:bg-gray-500',
};

export default function Roadmap() {
  const newTitle = 'Roadmap';
  const markdownFile = '_indexPage';
  const date = new Date().getFullYear();

  return (
    <SectionContext.Provider value='docs'>
      <Head>
        <title>{newTitle}</title>
      </Head>
      <Headline1>
        {newTitle} {date}
      </Headline1>

      <div className='text-gray-900 dark:text-white'>
        <div className='container mt-20 mx-auto px-4'>
          <div className='relative'>
            <div className='absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600'></div>

            {roadmap.map((item) => {
              const status =
                item.fieldValues.nodes.find(
                  (node) => node.field?.name === 'Status',
                )?.name || 'Unknown';
              const category =
                item.fieldValues.nodes.find(
                  (node) => node.field?.name === 'Category',
                )?.name || 'Uncategorized';
              const effort =
                item.fieldValues.nodes.find(
                  (node) => node.field?.name === 'Effort',
                )?.name || 'Unknown';
              const impact =
                item.fieldValues.nodes.find(
                  (node) => node.field?.name === 'Impact',
                )?.name || 'Unknown';

              return (
                <div key={item.id} className='relative z-10 mb-12 pl-8'>
                  <div className='absolute left-0 top-6 w-8 h-8 bg-blue-600 rounded-full z-10 flex items-center justify-center'>
                    <div className='w-4 h-4 bg-white dark:bg-gray-800 rounded-full'></div>
                  </div>

                  <div className='bg-white dark:bg-gray-800 relative z-10 mx-2 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg'>
                    <div className='p-6'>
                      <span className='inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full mb-4'>
                        {category}
                      </span>
                      <h2 className='text-2xl font-bold mb-3'>
                        {item.content.title}
                      </h2>

                      <div className='flex flex-wrap items-center gap-2 text-sm'>
                        <span
                          className={`px-2 py-1 rounded whitespace-nowrap ${
                            effortColors[effort as keyof typeof effortColors] ||
                            effortColors['Unknown']
                          }`}
                        >
                          Effort: {effort}
                        </span>
                        <span
                          className={`px-2 py-1 rounded whitespace-nowrap ${
                            impactColors[impact as keyof typeof impactColors] ||
                            impactColors['Unknown']
                          }`}
                        >
                          Impact: {impact}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-6 py-3 ${
                        statusColors[status as keyof typeof statusColors] ||
                        statusColors['Unknown']
                      }`}
                    >
                      <span className='text-sm font-semibold text-white uppercase'>
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <DocsHelp markdownFile={markdownFile} />
    </SectionContext.Provider>
  );
}

Roadmap.getLayout = getLayout;
