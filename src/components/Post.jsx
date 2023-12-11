import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostListContext } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div key={post.id} className="card post-card" style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          <MdDelete />
          <span className="visually-hidden">unread messages</span>
        </span>
        <div className="alert alert-success reaction" role="alert">
          This post is reacted by {post.reactions} peoples
        </div>
      </div>
    </div>
  );
};

export default Post;
