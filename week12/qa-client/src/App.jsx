import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import QuestionComponent from './components/Question';
import { Question, Answer } from './QAModels.mjs';
import { Answers } from './components/AnswerComponents';
import { useEffect, useState } from 'react';
import LanguageContext from './contexts/LanguageContext';
import { Routes, Route, Link } from 'react-router-dom';
import { AnswerForm, EditAnswerForm } from './components/AnswerForm';
import QuestionList from './components/QuestionList';
import { loadQuestions } from './api/API';

const fakeQuestion = new Question(1, 'What is your name?', 'juan@polito.it', '2024-02-07')
fakeQuestion.init();

function App() {

  // States

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState(
    fakeQuestion.getAnswers()
  );

  const [likes, setLikes] = useState(0);

  const [language, setLanguage] = useState('IT');

  const [loading, setLoading] = useState(true);


  // Effects 
  useEffect(()=>{
    loadQuestions().then((my_questions)=>{
        setQuestions(my_questions);
        setLoading(false);
    })
    
}, [])



  const toggleLanguage = () => { setLanguage(language === 'IT' ? 'EN' : 'IT') }

  const increaseLikes = () => { setLikes(oldLikes => oldLikes + 1) };

  // const voteUp = (answerId) => { setQuestion( (oldQuestion) => {return totally new Object,
  //    identical to the previous one (oldQuestion), except for the score of this specific answer}}

  const deleteAnswer = (id) => {
    setAnswers(oldAnswers => oldAnswers.filter((a) => (a.id != id)))
  }

  /*
  const voteUp = (id) => {
    setAnswers(oldAnswers => oldAnswers.map( a => {
      if(a.id==id) {
        return {...a, score: a.score+1}
      } else {
        return a
      }
    }))
  }
  */

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, answer.date, 0);
      return [...oldAnswers, newAnswer];

    })
  }

  const updateAnswer = (answer) => {
    console.log(answer)
    setAnswers(oldAnswers => {
      return oldAnswers.map((ans) => {
        if (ans.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.email, answer.date, ans.score);
        }
        else
          return ans;
      });
    });
  }

  const voteUp = id => {
    setAnswers(oldAnswers =>
      oldAnswers.map(a => a.id == id ? { ...a, score: a.score + 1 } : a))
  }

  return (
    <LanguageContext.Provider value={language}>
      <Container>
        <NavigationBar language={language} toggleLanguage={toggleLanguage} />
        {!loading && <Routes>
          <Route path='/' element={<QuestionList questions={questions}/>} />
          <Route path='/questions/:qid' element={
            <QuestionComponent likes={likes} increaseLikes={increaseLikes} questions={questions} />
          }>
            <Route index element={<Answers answers={answers} deleteAnswer={deleteAnswer} voteUp={voteUp} addAnswer={addAnswer} updateAnswer={updateAnswer} />} />
            <Route path='add' element={<AnswerForm addAnswer={addAnswer} mode='add' />} />
            <Route path='edit/:aid' element={<EditAnswerForm updateAnswer={updateAnswer} answers={answers} />} />
          </Route>
        </Routes>}
      </Container>
    </LanguageContext.Provider>
  )
}

export default App
