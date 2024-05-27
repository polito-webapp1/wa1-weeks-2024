import { useEffect, useState } from "react"
import {loadQuestions} from "../api/API"

function QuestionList(props) {

    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        loadQuestions().then((my_questions)=>{
            setQuestions(my_questions);
        })
        
    }, [])

    if (questions.length==0)
        return "Loading..."
    else
        return <div>
            {questions.map((q,i)=><p key={i}>{q.text}</p>)}
        </div>
}

export default QuestionList