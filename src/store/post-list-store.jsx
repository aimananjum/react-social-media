import { createContext, useReducer,useState,useEffect } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );

  } 
  else if(action.type==="ADD_INITIAL_POSTS"){
    newPostList = action.payload.posts;
  }
  else if (action.type === "ADD_POST") {
    
    newPostList = [action.payload.post, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [fetching,setFetching] = useState(false);
  useEffect(()=>{
    setFetching(true);
    fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(data =>{addInitialPosts(data.posts);
setFetching(false);
}
);
  },[]);

  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = (post) => {
    
    dispatchPostList({
      type: "ADD_POST",
      payload: { post },
    });
  };
  const addInitialPosts = (posts)=>{
    dispatchPostList({
      type:"ADD_INITIAL_POSTS",
      payload:{
        posts,
      }
    })
  }
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost,fetching }}>
      {children}
    </PostListContext.Provider>
  );
};
export default PostListProvider;

const DEFAULT_POST_LIST=[];

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Going to mumbai",
//     body: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
//     reaction: 2,
//     userId: "user-3",
//     tags: ["Hello world", "How are you"],
//   },
//   {
//     id: "2",
//     title: "Going to mudfnvdfnvdnf mbai",
//     body: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
//     reaction: 15,
//     userId: "user-9",
//     tags: ["Hello world", "How are you"],
//   },
// ];
