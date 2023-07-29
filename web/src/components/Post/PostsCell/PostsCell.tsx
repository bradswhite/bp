import type { FindPosts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
//import { useEffect } from 'react'
import Posts from 'src/components/Post/Posts'

export const QUERY = gql`
  query FindPosts {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No posts yet. '}
      <Link to={routes.newPost()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

interface SuccessProps extends CellSuccessProps<FindPosts> {
  toast: (string, string) => void;
}

export const Success = ({ posts, toast }: SuccessProps) => {
  /*useEffect(() => {
    toast('Howdy!', 'ajskjdkjfa');
  }, [])*/
  return <Posts posts={posts} toast={toast} />
}
