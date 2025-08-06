import React from "react";

const CommentList = ({ comments }) => {
  // ! No longer necessary since we implemented query microservice, which gets 
  // ! all the posts and the comments associated with them in one single call
  // const [comments, setComments] = useState([]);
  // const fetchData = async () => {
  //   const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComment = comments ? (
    comments.map((comment) => {
      let content;
      if (comment.status === 'approved') content = comment.content;
      if (comment.status === 'pending') content = 'This comment is awaiting moderation :)';
      if (comment.status === 'rejected') content = 'This comment has been rejected :(';
      return <li key={comment.id}>{content}</li>;
    })
  ) : (
    <li>No Comments, be the first one to comment</li>
  );

  return (
    <ul>
      {renderedComment}
    </ul>
  )
};

export default CommentList;