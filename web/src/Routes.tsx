import { Private, Router, Route, Set } from '@redwoodjs/router'

import BlogLayout from 'src/layouts/BlogLayout';

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={BlogLayout}>
        <Private unauthenticated='home'>
          <Route path='/posts/new' page={PostNewPostPage} name='newPost' />
          <Route path='/posts/{id:Int}/edit' page={PostEditPostPage} name='editPost' />
          <Route path='/posts/{id:Int}' page={PostPostPage} name='post' />
          <Route path='/posts' page={PostPostsPage} name='posts' toast={(title: string, desc: string) => {alert(title)}} />
        </Private>
        <Route path='/about' page={AboutPage} name='about' />
        <Route path='/contact' page={ContactPage} name='contact' />
        <Route path='/' page={HomePage} name='home' />
        <Route path='/article/{id:Int}' page={ArticlePage} name='article' />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
