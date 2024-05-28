import { Link } from "react-router-dom";

function QuestionList({questions}) {

    if(questions.length==0)
        return "No questions yet"
    else 
        return <div>
        <ul>
            {questions.map((q,i)=><li key={i}><Link to={`/questions/${q.id}`}>{q.text}</Link></li>)}
            </ul>
        </div>
}

export default QuestionList