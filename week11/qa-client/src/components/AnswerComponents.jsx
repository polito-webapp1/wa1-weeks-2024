import { Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ArrowUp, PencilSquare, Trash } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';

function Answers(props) {

  const language = useContext(LanguageContext);

  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} deleteAnswer={props.deleteAnswer} voteUp={props.voteUp}></AnswerTable>
        </Col>
      </Row>

      <Button variant='primary' onClick={() => { navigate('add'); }}>{language == 'IT' ? 'Aggiungi' : 'Add'}</Button>

    </>
  );
}

Answers.propTypes = {
  answers: PropTypes.array,
}

function AnswerTable(props) {

  const [sortOrder, setSortOrder] = useState('none');

  const sortedAnswers = [...props.answers];

  if (sortOrder === 'asc') {
    sortedAnswers.sort((a, b) => a.score - b.score);
  }
  else if (sortOrder === 'desc') {
    sortedAnswers.sort((a, b) => b.score - a.score);
  }

  const sortByScore = () => {
    setSortOrder((oldOrder) => oldOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>Score <Button variant="link" onClick={sortByScore}>Sort</Button></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} deleteAnswer={props.deleteAnswer} voteUp={props.voteUp} />)
          }
        </tbody>
      </Table>
    </>
  );
}

AnswerTable.propTypes = {
  answers: PropTypes.array,
}

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerActions deleteAnswer={props.deleteAnswer} voteUp={props.voteUp} id={props.answer.id} handleEdit={props.handleEdit} answer={props.answer} />
    </tr>
  );
}

AnswerRow.propTypes = {
  answer: PropTypes.object,
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

AnswerData.propTypes = {
  answer: PropTypes.object
}

function AnswerActions(props) {
  const navigate = useNavigate();
  return <td>
    <Button variant='warning' onClick={() => { props.voteUp(props.id) }}><ArrowUp /></Button>
    <Button variant='primary' className='mx-1' onClick={() => { navigate(`edit/${props.id}`) }}><PencilSquare /></Button>
    <Button variant='danger' onClick={() => { props.deleteAnswer(props.id) }}><Trash /></Button>
  </td>
}

export { Answers };