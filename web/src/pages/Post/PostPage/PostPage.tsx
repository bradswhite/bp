import PostCell from 'src/components/Post/PostCell';
import toastPropsType from 'src/types/toast';

type PostPageProps = {
  id: number;
  toast: toastPropsType;
}

const PostPage = ({ id, toast }: PostPageProps) => {
  return <PostCell id={id} toast={toast} />
}

export default PostPage
