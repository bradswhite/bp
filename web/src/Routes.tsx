import { Private, Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import BlogLayout from 'src/layouts/BlogLayout';

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated='home'>
        <Set wrap={ScaffoldLayout} title='Posts' titleTo='posts' buttonLabel='New Post' buttonTo='newPost'>
          <Route path='/admin/posts/new' page={PostNewPostPage} name='newPost' />
          <Route path='/admin/posts/{id:Int}/edit' page={PostEditPostPage} name='editPost' />
          <Route path='/admin/posts/{id:Int}' page={PostPostPage} name='post' />
          <Route path='/admin/posts' page={PostPostsPage} name='posts' toast={(title: string, desc: string) => {alert(title)}} />
        </Set>
      </Private>
      <Set wrap={BlogLayout}>
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
