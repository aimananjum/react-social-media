import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList,addInitialPosts } = useContext(PostListContext);
  // const [fetchPosts,setFetchPosts] = useState(false);
  const [fetching,setFetching] = useState(false);
  useEffect(()=>{
    setFetching(true);
    fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(data =>{addInitialPosts(data.posts);
setFetching(false);
}
);
  },[])

  // if(!fetchPosts){
//     fetch('https://dummyjson.com/posts')
// .then(res => res.json())
// .then(data =>{addInitialPosts(data.posts)});
// setFetchPosts(true);
  // }
  
  return (
    <>
    {fetching && <LoadingSpinner/>}
    {
     !fetching &&  postList.length===0 && <WelcomeMessage/>
    }
      {!fetching &&  postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
