import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from 'src/components/Article';

import { clsx } from 'clsx';

export const QUERY = gql`
  query FindArticleQuery($id: Int!) {
    article: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  article: { title, body, createdAt }
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return <main
    className={clsx(
      'w-screen py-20',
      'bg-white dark:bg-gray-800',
      'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
      'border-y border-gray-200 dark:border-gray-700',
      'justify-center flex'
    )}
  >
    <article className='w-2/3'>
      <header>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{title}</h2>
        <span className='mt-1 text-sm font-normal text-gray-600 dark:text-gray-500'>Posted at: {createdAt}</span>
      </header>
      <p className='mt-10 text-md font-normal text-gray-700 dark:text-gray-400'>{body}</p>
    </article>
  </main>
}
