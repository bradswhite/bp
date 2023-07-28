import type { EditPostById, UpdatePostInput } from 'types/graphql'

import { useState } from 'react';
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import Toast from "src/components/UIComponents/Toast";

import PostForm from 'src/components/Post/PostForm'

export const QUERY = gql`
  query EditPostById($id: Int!) {
    post: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post }: CellSuccessProps<EditPostById>) => {
  const [toastToggle, toggleToast] = useState(false);
  const [toastTitle, setToastTitle] = useState<string>();
  const [toastDesc, setToastDesc] = useState<string>();

  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      setToastTitle('Post Updated Successfully');
      setToastDesc(`Post ${post.id} updated`);
      toggleToast(true);
      navigate(routes.posts())
    },
    onError: (error) => {
      setToastTitle('Error Message');
      setToastDesc(error.message);
      toggleToast(true);
    },
  })

  const onSave = (input: UpdatePostInput, id: EditPostById['post']['id']) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <>
      <Toast title={toastTitle} desc={toastDesc} toggle={toastToggle} />

      <div className='shadow-xl rounded-2xl border border-1 border-gray-200 dark:border-gray-600'>
        <header className='w-full bg-gray-200 dark:bg-gray-900 rounded-t-2xl'>
          <h2 className='text-xs text-gray-700 uppercase dark:text-gray-400 w-full text-left p-4'>
            Edit Post {post?.id}
          </h2>
        </header>
        <div className='bg-gray-50 dark:bg-gray-700 py-2 px-4 rounded-b-2xl'>
          <PostForm post={post} onSave={onSave} error={error} loading={loading} />
        </div>
      </div>
    </>
  )
}
