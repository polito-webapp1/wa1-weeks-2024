import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import QuestionComponent from './components/Question';
import { Answers } from './components/AnswerComponents';
import { useEffect, useState } from 'react';
import LanguageContext from './contexts/LanguageContext';
import { Routes, Route } from 'react-router-dom';
import { AnswerForm, EditAnswerForm } from './components/AnswerForm';
import QuestionList from './components/QuestionList';
import { loadQuestions } from './api/API';

function App() {

  // States

  const [questions, setQuestions] = useState([]);

  const [language, setLanguage] = useState('IT');

  const [loading, setLoading] = useState(true);


  /* Effects */
  
  // Load question list at application startup
  useEffect(() => {
    loadQuestions().then((my_questions) => {
      setQuestions(my_questions);
      setLoading(false);
    })
  }, [])



  const toggleLanguage = () => { setLanguage(language === 'IT' ? 'EN' : 'IT') }


  return (
    <LanguageContext.Provider value={language}>
      <Container>
        <NavigationBar language={language} toggleLanguage={toggleLanguage} />
        {!loading && <Routes>
          <Route path='/' element={<QuestionList questions={questions} />} />
          <Route path='/questions/:qid' element={
            <QuestionComponent questions={questions} />
          }>
            <Route index element={<Answers />} />
            <Route path='add' element={<AnswerForm  mode='add' />} />
            <Route path='edit/:aid' element={<EditAnswerForm />} />
          </Route>
        </Routes>}
      </Container>
    </LanguageContext.Provider>
  )
}

export default App
