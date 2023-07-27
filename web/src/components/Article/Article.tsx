import { Link, routes } from '@redwoodjs/router';
import Balancer from 'react-wrap-balancer';
import { clsx } from 'clsx';

const Article = ({ article: {
  id, title, body, createdAt
} }) => {
  return (
    <Link to={routes.article({ id })}>
      <article
        className={clsx(
          'max-w-md rounded-lg p-4 md:w-full',
          'bg-white dark:bg-gray-800',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
          'border border-gray-200 dark:border-gray-700 shadow-xl cursor-pointer'
        )}
      >
        <Balancer>
          <header>
            <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{title}</h2>
          </header>
          <p className='mt-2 text-md font-normal text-gray-700 dark:text-gray-400'>{body}</p>
          <div className='mt-1 text-sm font-normal text-gray-600 dark:text-gray-500'>Posted at: {createdAt}</div>
        </Balancer>
      </article>
    </Link>
  )
}

export default Article
