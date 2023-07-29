import NewPost from 'src/components/Post/NewPost'
import toastPropsType from 'src/types/toast';

type PostsPageType = {
  toast: toastPropsType;
};

const NewPostPage = ({ toast }: PostsPageType) => {
  return <NewPost toast={toast} />
}

export default NewPostPage
