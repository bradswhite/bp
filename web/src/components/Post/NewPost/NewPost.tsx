import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react';
import { useMutation } from '@redwoodjs/web'
import Toast from "src/components/UIComponents/Toast";

import PostForm from 'src/components/Post/PostForm'

import type { CreatePostInput } from 'types/graphql'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const NewPost = () => {
  const [toastToggle, toggleToast] = useState(false);
  const [toastTitle, setToastTitle] = useState<string>();
  const [toastDesc, setToastDesc] = useState<string>();

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      setToastTitle('Post Created Successfully');
      setToastDesc(`Post created`);
      toggleToast(true);
      navigate(routes.posts())
    },
    onError: (error) => {
      setToastTitle('Error Message');
      setToastDesc(error.message);
      toggleToast(true);
    },
  })

  const onSave = (input: CreatePostInput) => {
    createPost({ variables: { input } })
  }

  return (
    <>
      <Toast title={toastTitle} desc={toastDesc} toggle={toastToggle} />

      <div className='shadow-xl rounded-2xl border border-1 border-gray-200 dark:border-gray-600'>
        <header className='w-full bg-gray-200 dark:bg-gray-900 rounded-t-2xl'>
          <h2 className='text-xs text-gray-700 uppercase dark:text-gray-400 w-full text-left p-4'>New Post</h2>
        </header>
        <div className='bg-gray-50 dark:bg-gray-700 py-2 px-4 rounded-b-2xl'>
          <PostForm onSave={onSave} loading={loading} error={error} />
        </div>
      </div>
    </>
  )
}

export default NewPost
