import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import QuestionComponent from './components/Question';
import {Question, Answer} from './QAModels.mjs';
import { Answers } from './components/AnswerComponents';

const fakeQuestion = new Question(1, 'What is your name?', 'juan@polito.it', '2024-02-07')
fakeQuestion.init();

function App() {

  return (
    <Container>
      <NavigationBar qtnnumber={1} />
      <QuestionComponent qtnnumber={fakeQuestion.id} question={fakeQuestion.text} email={fakeQuestion.email}></QuestionComponent>
      <Answers answers={fakeQuestion.getAnswers()}></Answers>
    </Container>
  )
}

export default App
