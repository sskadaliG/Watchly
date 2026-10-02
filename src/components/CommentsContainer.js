import { INITIAL_LOGO } from '../utils/constants'
import { commentsData } from '../utils/commentsData'

const Comments = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex w-full pl-2 py-2 bg-gray-50 rounded-lg">
      <img className="w-12 rounded-full mr-4" alt="logo" src={INITIAL_LOGO} />
      <div><h1 className="font-bold">{name}</h1>
        <p>{text}</p></div>

    </div>
  )
};

const CommentList = ({ comments }) => {
  return comments?.map((c, index) => (
    <div key={index} className="py-2 pl-2">
      <Comments data={c} />
      <div className="border-l-2 border-gray-200 ml-5 pl-5">

        <CommentList comments={c?.reply}></CommentList>
      </div>
    </div>

  ));
};


const CommentsContainer = () => {


  return (
    <div className="pt-2 my-2">
      <h1 className="font-bold text-xl mb-4">Comments</h1>
      <div>
        <CommentList comments={commentsData}></CommentList>
      </div>
    </div>
  )
}

export default CommentsContainer