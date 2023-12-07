import { useContext } from "react";
import { useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const userId = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const reactions = useRef();
  const tags = useRef();
  const { addPost } = useContext(PostListContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    let tagsArray = tags.current.value.split(" ");

    let post = {
      id: Date.now(),
      title: postTitle.current.value,
      body: postBody.current.value,
      reaction: reactions.current.value,
      userId: userId.current.value,
      tags: tagsArray,
    };
    postTitle.current.value = "";
    postBody.current.value = "";
    reactions.current.value = "";
    userId.current.value = "";
    tags.current.value = "";
    addPost(post);
  };
  return (
    <form
      className="create-post"
      onSubmit={(event) =>  handleSubmit(event)}
    >
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          User Id
        </label>
        <input
          ref={userId}
          type="text"
          className="form-control"
          id="userid"
          placeholder="Enter your user-id"
        />
      </div>
      <div className="mb-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitle}
          className="form-control"
          id="title"
          placeholder="How you are feeling today..."
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBody}
          rows="4"
          className="form-control"
          id="content"
          placeholder="Tell us more about this"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Number of Reactions
        </label>
        <input
          type="number"
          ref={reactions}
          className="form-control"
          id="reactions"
          placeholder="how many people reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Enter your Hashtags
        </label>
        <input
          type="text"
          ref={tags}
          className="form-control"
          placeholder="Enter the hashtags (space seperated)"
          id="hastags"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
