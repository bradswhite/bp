import { ReactNode, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Link, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import NavigationMenu from 'src/components/UIComponents/NavigationMenu';
import Button from 'src/components/UIComponents/shared/Button';
import Login from 'src/components/Login';
import ThemeSwitcher from 'src/components/UIComponents/shared/ThemeSwitcher';

type BlogLayoutProps = {
  children?: ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();

  const [ seed, setSeed ] = useState(Math.random());

  return <>
    <header className='flex flex-wrap items-center justify-between mx-auto py-6 px-20'>
      <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
        <Link to={routes.home()}>Boilerplate App Code</Link>
      </h1>

      <NavigationMenu links={
        isAuthenticated ? [
          { title: 'About', href: '/about' },
          { title: 'Contact', href: '/contact' },
          { title: 'Edit Posts', href: '/posts' }
        ] : [
          { title: 'About', href: '/about' },
          { title: 'Contact', href: '/contact' }
        ]}
      />

      <div className='text-gray-900 dark:text-gray-100 font-sm'>
        {isAuthenticated ? (
          <div>
            <span>Logged in as {currentUser.email}</span>{' '}
              <Button onClick={logOut}>
              Logout
            </Button>
          </div>
        ) : (
          <Login setSeed={setSeed}>
            <Button>Login</Button>
          </Login>
        )}
      </div>

      <div>
        <ThemeSwitcher />
      </div>
    </header>

    <main
      className={clsx(
        'w-screen p-20 overflow-x-hidden',
        'bg-gray-50 dark:bg-gray-800',
        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        'border-y border-gray-200 dark:border-gray-700'
      )}
    >
      {children}
    </main>
  </>
}

export default BlogLayout;
