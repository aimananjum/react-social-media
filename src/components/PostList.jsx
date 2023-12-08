import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList = () => {
  const { postList,addInitialPosts } = useContext(PostListContext);
  // const [fetchPosts,setFetchPosts] = useState(false);
  useEffect(()=>{
    fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(data =>{addInitialPosts(data.posts)});
  },[])

  // if(!fetchPosts){
//     fetch('https://dummyjson.com/posts')
// .then(res => res.json())
// .then(data =>{addInitialPosts(data.posts)});
// setFetchPosts(true);
  // }
  
  return (
    <>
    {
      postList.length===0 && <WelcomeMessage/>
    }
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
