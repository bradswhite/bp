import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPostById, UpdatePostInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { clsx } from 'clsx';

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

const PostForm = (props: PostFormProps) => {
  const onSubmit = (data: FormPost) => {
    props.onSave(data, props?.post?.id)
  }

  return (
    <Form<FormPost>
      className='mt-2 space-y-2'
      onSubmit={onSubmit}
      error={props.error}
    >
      <FormError
        error={props.error}
        wrapperClassName='rw-form-error-wrapper'
        titleClassName='rw-form-error-title'
        listClassName='rw-form-error-list'
      />

      <fieldset>
        <Label
          name='title'
          errorClassName='rw-label rw-label-error'
          className='text-xs font-medium text-gray-700 dark:text-gray-400'
        >
          Title
        </Label>
        <TextField
          name='title'
          validation={{ required: true }}
          defaultValue={props.post?.title}
          className={clsx(
            'mt-1 block w-full rounded-md',
            'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
            'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
          errorClassName='rw-input rw-input-error'
        />
        <FieldError name='title' className='rw-field-error' />
      </fieldset>

      <fieldset>
        <Label
          name='body'
          errorClassName='rw-label rw-label-error'
          className='text-xs font-medium text-gray-700 dark:text-gray-400'
        >
          Body
        </Label>
        <TextField
          name='body'
          validation={{ required: true }}
          defaultValue={props.post?.body}
          className={clsx(
            'mt-1 block w-full rounded-md',
            'text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600',
            'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
          errorClassName='rw-input rw-input-error'
        />
        <FieldError name='body' className='rw-field-error' />
      </fieldset>

      <div className='mt-4 flex justify-end'>
        <Submit
          disabled={props.loading} 
          className={clsx(
            'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
            'bg-blue-600 text-blue-50 hover:bg-blue-700 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600',
            'border border-transparent',
            'focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'
          )}
        >
          Save
        </Submit>
      </div>
    </Form>
  )
}

export default PostForm
