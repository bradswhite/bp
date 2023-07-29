import { MetaTags } from '@redwoodjs/web'
import ArticlesCell from 'src/components/ArticlesCell';
import { clsx } from 'clsx'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <ArticlesCell />
    </>
  )
}

export default HomePage
