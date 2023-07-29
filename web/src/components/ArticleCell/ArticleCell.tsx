import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { timeTag } from 'src/lib/formatters'

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

export const Loading = () => (
  <div className='justify-center flex'>
    <article className='w-2/3 animate-pulse'>
      <div className='h-2 rounded bg-gray-900 dark:bg-gray-100'></div>
      <div className='mt-2 h-2 rounded bg-gray-800 dark:bg-gray-400'></div>
      <div className='mt-2 h-2 rounded bg-gray-600 dark:bg-gray-500'></div>
    </article>
  </div>
);


export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  article: { title, body, createdAt }
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return <div className='justify-center flex'>
    <article className='w-2/3'>
      <header>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{title}</h2>
        <span className='mt-1 text-sm font-normal text-gray-600 dark:text-gray-500'>Posted at: {timeTag(createdAt)}</span>
      </header>
      <p className='mt-10 text-md font-normal text-gray-700 dark:text-gray-400'>{body}</p>
    </article>
  </div>
}
