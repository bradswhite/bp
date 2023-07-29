import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import Button from "src/components/UIComponents/shared/Button";
import Table from "src/components/UIComponents/Table";

import { timeTag, truncate } from 'src/lib/formatters'

import type { DeletePostMutationVariables, FindPostById } from 'types/graphql'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

interface Props {
  post: NonNullable<FindPostById['post']>
}

const Post = ({ post: { id, title, body, createdAt } }: Props) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      setToastTitle('Deletion Successful');
      setToastDesc(`Post ${id} deleted`);
      toggleToast();
      navigate(routes.posts())
    },
    onError: (error) => {
      setToastTitle('Error Deleting Post');
      setToastDesc(error.message);
      toggleToast();
    }
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <>
      <Table
        headings={[ `Post ${id} Detail` ]}
        dataRows={[
          [ 'Id', truncate(id) ],
          [ 'Title', truncate(title) ],
          [ 'Body', truncate(body) ],
          [ 'Created at', timeTag(createdAt) ]
        ]}
      />

      <div className='w-full flex justify-center py-6'>
        <nav className='flex gap-4'>
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
      </div>
    </>
  )
}

export default Post
