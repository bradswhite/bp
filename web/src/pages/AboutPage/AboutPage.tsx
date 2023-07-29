import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { clsx } from 'clsx';

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <div className='justify-center flex'>
        <article className='w-2/3'>
          <header>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>About</h2>
          </header>
          <p className='mt-10 text-md font-normal text-gray-700 dark:text-gray-400'>This is some about me text...</p>
        </article>
      </div>
    </>
  )
}

export default AboutPage
