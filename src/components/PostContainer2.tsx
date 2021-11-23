import React from 'react';
import { postAPI } from '../services/PostService';
import { IPost } from '../store/models/IPost';
import PostItem from './PostItem';

const PostContainer2 = () => {

    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(100)


    const [deletePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();

    const handleRemove = (post: IPost) => {
        deletePost(post);
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            <div className="post__list">
                {isLoading && <h1>Идет загрузка</h1> }
                {error && <h1>Произощла ошибка при загрузке</h1> }
                {posts && posts.map(post => 
                    <PostItem
                    remove={handleRemove}
                    update={handleUpdate}
                    post={post} key={post.id} />
                    )}
                </div> 
        </div>
    );
};

export default PostContainer2;