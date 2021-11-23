import React, { useEffect, useState } from 'react';
import { postAPI } from '../services/PostService';
import { IPost } from '../store/models/IPost';
import PostItem from './PostItem';

const PostContainer = () => {


    const [limit, setLimit] = useState(100);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 1000
    })

    const [createPost, {}] = postAPI.useCreatePostMutation({});

    const [deletePost, {}] = postAPI.useDeletePostMutation({});
    const [updatePost, {}] = postAPI.useUpdatePostMutation({});

    useEffect(() => {
        // setTimeout(() => {
        //     setLimit(3)
        // }, 2000)
    }, [])

const handleCreate = async () => {
    const title = prompt();
   await createPost({title, body: title} as IPost)
}

const handleRemove = (post: IPost) => {
    deletePost(post);
}

const handleUpdate = (post: IPost) => {
    updatePost(post);
}

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>Add new post</button>
                {/* <button onClick={() => refetch()}>REFETCH</button> */}
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

export default PostContainer;