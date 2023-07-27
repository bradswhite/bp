import { useState } from 'react';
import { MetaTags, useMutation } from '@redwoodjs/web';
import {
  Form, TextField, TextAreaField, Submit, FieldError, Label, SubmitHandler, FormError, useForm
} from '@redwoodjs/forms';
import { clsx } from 'clsx';
import Toast from "src/components/UIComponents/Toast";
import {
  CreateContactMutation,
  CreateContactMutationVariables
} from 'types/graphql';

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' });

  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();

  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      setTitle('Submitted');
      setDesc('Thank you for your submission!');
      setToggle(true);
      formMethods.reset();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } });
  };

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toast title={title} desc={desc} toggle={toggle} />
      
      <main
        className={clsx(
          'w-screen py-20',
          'bg-white dark:bg-gray-800',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
          'border-y border-gray-200 dark:border-gray-700',
          'justify-center flex'
        )}
      >
        <article className='w-2/3 text-gray-700 dark:text-gray-400'>
          <header>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>Contact</h2>
          </header>
          <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }} error={error} formMethods={formMethods}>
            <FormError error={error} wrapperClassName="form-error" />
            
            <fieldset>
              <Label
                name="username"
                errorClassName="rw-label rw-label-error"
                className="text-xs font-medium text-gray-700 dark:text-gray-400"
              >
                Name
              </Label>
              <TextField
                name="name"
                validation={{
                  required: true
                }}
                placeholder='Name'
                className={clsx(
                  "mt-1 block w-full rounded-md",
                  "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                  "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
                errorClassName="rw-input rw-input-error"
              />
              <FieldError name="name" className="rw-field-error" />
            </fieldset>

            <fieldset>
              <Label
                name="email"
                errorClassName="rw-label rw-label-error"
                className="text-xs font-medium text-gray-700 dark:text-gray-400"
              >
                Email
              </Label>
              <TextField
                name="email"
                validation={{
                  required: true,
                  pattern: {
                    value: /^[^@]+@[^.]+\..+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                placeholder='Email'
                className={clsx(
                  "mt-1 block w-full rounded-md",
                  "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                  "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
                errorClassName="rw-input rw-input-error"
              />
              <FieldError name="email" className="rw-field-error" />
            </fieldset>

            <fieldset>
              <Label
                name="message"
                errorClassName="rw-label rw-label-error"
                className="text-xs font-medium text-gray-700 dark:text-gray-400"
              >
                Message
              </Label>
              <TextAreaField
                name="message"
                validation={{
                  required: true
                }}
                placeholder='Message'
                className={clsx(
                  "mt-1 block w-full rounded-md",
                  "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                  "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
                errorClassName="rw-input rw-input-error"
              />
              <FieldError name="message" className="rw-field-error" />
            </fieldset>

            <div className="mt-4 flex justify-end">
              <Submit
                disabled={loading}
                className={clsx(
                  "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                  "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                  "border border-transparent",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >Send Message</Submit>
            </div>
          </Form>
        </article>
      </main>
    </>
  )
}

export default ContactPage
