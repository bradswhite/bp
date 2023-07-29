import EditPostCell from 'src/components/Post/EditPostCell'
import toastPropsType from 'src/types/toast';

type PostPageProps = {
  id: number;
  toast: toastPropsType;
}

const EditPostPage = ({ id, toast }: PostPageProps) => {
  return <EditPostCell id={id} toast={toast} />
}

export default EditPostPage
