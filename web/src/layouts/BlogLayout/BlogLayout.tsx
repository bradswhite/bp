import { useState, useEffect } from 'react';

import { Link, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import NavigationMenu from 'src/components/UIComponents/NavigationMenu';
import Button from 'src/components/UIComponents/shared/Button';
import Login from 'src/components/Login';

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();

  const [ seed, setSeed ] = useState(Math.random());

  return <>
    <header className='flex flex-wrap items-center justify-between mx-auto py-6 px-20'>
      <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
        <Link to={routes.home()}>Boilerplate App Code</Link>
      </h1>

      <NavigationMenu links={[
        { title: 'About', href: '/about' },
        { title: 'Contact', href: '/contact' }
      ]} />

      {/*<nav>
        <ul>
          <li><Link to={routes.about()}>About</Link></li>
          <li><Link to={routes.contact()}>Contact</Link></li>
        </ul>
      </nav>*/}

      <div className='text-gray-900 dark:text-gray-100'>
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
    </header>

    <main className='w-screen overflow-x-hidden'>
      {children}
    </main>
  </>
}

export default BlogLayout;
