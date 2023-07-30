import type { ArticlesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from 'src/components/Article';
import SkeletonArticle from 'src/components/SkeletonArticle';

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => (
  <div className='grid flex grid-col-1 gap-6 md:gap-10 md:grid-cols-3'>
    {new Array(4).fill(undefined).map((n, i) => (
      <SkeletonArticle key={i} />
    ))}
  </div>
);

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return <div className='grid flex grid-col-1 gap-6 md:gap-10 md:grid-cols-3'>
    {articles.map(article => (
      <Article key={article.id} article={article} />
    ))}
  </div>;
}
