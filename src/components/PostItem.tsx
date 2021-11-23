import React, {FC} from 'react';
import { IPost } from '../store/models/IPost';


// указываем типы пропсов в интерфейса 
interface PostItemProps {
    post: IPost;
    remove: (post: IPost) => void;
    update: (post: IPost) => void;
}

// указываем PostItemProps как дженерик для компонента 
const PostItem: FC<PostItemProps> = ({post, remove, update}) => {
  
const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
}

const handleUpdtate = (event: React.MouseEvent) => {
    const title = prompt() || '';
    update({...post, title})
}

    return (
        <div className="post" onClick={handleUpdtate}>
            {post.id}. {post.title}
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default PostItem;