import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import Button from "src/components/UIComponents/shared/Button";
import Table from "src/components/UIComponents/Table";

import { QUERY } from 'src/components/Post/PostsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeletePostMutationVariables, FindPosts } from 'types/graphql'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

interface PostsListProps extends FindPosts {
  toast: (string, string) => void;
}

const PostsList = ({ posts, toast }: PostsListProps) => {

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast('Deletion Successful', 'Post deleted');
    },
    onError: (error) => {
      toast('Error Message', error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <>
      <Table
        headings={[ 'Id', 'Title', 'Body', 'Created at' ]}
        dataRows={posts.map(({
          id, title, body, createdAt
        }) => [
          truncate(id),
          truncate(title),
          truncate(body),
          timeTag(createdAt),
          <nav className='flex gap-4'>
            <Link
              to={routes.post({ id })}
              title={'Show post ' + id + ' detail'}
            >
              <Button>Show</Button>
            </Link>
            <Link
              to={routes.editPost({ id })}
              title={'Edit post ' + id + ' detail'}
            >
              <Button color='blue'>Edit</Button>
            </Link>
            <Button
              title={'Delete post ' + id}
              color='red'
              onClick={() => onDeleteClick(id)}
            >
              Delete
            </Button>
          </nav>
        ])}
      />

      <div className='w-full flex justify-center py-6'>
        <nav className='flex gap-4'>
          <Link
            to={routes.newPost()}
            title='Create New Post'
          >
            <Button color='green'>
              <span className='text-2xl leading-5 mr-1'>+</span> New Post
            </Button>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default PostsList;
