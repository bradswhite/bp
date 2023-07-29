import PostsCell from 'src/components/Post/PostsCell'

import { useEffect } from 'react'

interface PostsPageType {
  toast: (string, string) => void
}

const PostsPage = (props: PostsPageType) => {
  useEffect(() => {
    console.log(props)
  }, [])
  return <PostsCell toast={props.toast} />
}

export default PostsPage
