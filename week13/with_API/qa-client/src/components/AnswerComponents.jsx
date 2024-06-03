import { Row, Col, Table, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ArrowDownUp, ArrowUp, PencilSquare, Trash } from 'react-bootstrap-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import { deleteAnswer, loadAnswers, upVoteAnswer } from '../api/API';

function  Answers(props) {

  const language = useContext(LanguageContext);

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable deleteAnswer={props.deleteAnswer} voteUp={props.voteUp}></AnswerTable>
        </Col>
      </Row>

      <Button variant='primary' onClick={() => { navigate('add'); }}>{language == 'IT' ? 'Aggiungi' : 'Add'}</Button>

    </Container>
  );
}

Answers.propTypes = {
  answers: PropTypes.array,
  deleteAnswer: PropTypes.function,
  voteUp: PropTypes.function
}

function AnswerTable() {

  const { qid } = useParams()

  const [answers, setAnswers] = useState([]);

  const [sortOrder, setSortOrder] = useState('none');


  // Effects
  useEffect(() => {
    loadAnswers(qid).then((ans) => setAnswers(ans))
  }, [qid])

  // Event Handlers

  const onSort = () => {
    setSortOrder((oldOrder) => oldOrder === 'asc' ? 'desc' : 'asc');
  }

  const onUpVote = async (aid) => {
    await upVoteAnswer(aid);
    const ans = await loadAnswers(qid)
    setAnswers(ans);
  }

  const onDelete = async (aid) => {
    await deleteAnswer(aid);
    const ans = await loadAnswers(qid)
    setAnswers(ans);
  }


  // Local variables and render computations
  const sortedAnswers = [...answers];

  if (sortOrder === 'asc') {
    sortedAnswers.sort((a, b) => a.score - b.score);
  }
  else if (sortOrder === 'desc') {
    sortedAnswers.sort((a, b) => b.score - a.score);
  }


  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>Score <ArrowDownUp onClick={onSort} /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} deleteAnswer={onDelete} voteUp={onUpVote} />)
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
      <AnswerActions voteUp={props.voteUp} deleteAnswer={props.deleteAnswer} id={props.answer.id} answer={props.answer} />
    </tr>
  );
}

AnswerRow.propTypes = {
  answer: PropTypes.object,
  voteUp: PropTypes.func,
  deleteAnswer: PropTypes.func,
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
  answer: PropTypes.object,
}

AnswerActions.propTypes = {
  id: PropTypes.number,
  voteUp: PropTypes.func,
  deleteAnswer: PropTypes.func,
  answer: PropTypes.object
}

function AnswerActions(props) {
  const navigate = useNavigate();
  return <td>
    <Button variant='warning' onClick={() => { props.voteUp(props.id) }}><ArrowUp /></Button>
    <Button variant='primary' className='mx-1' onClick={() => { navigate(`edit/${props.id}`, { state: props.answer }) }}><PencilSquare /></Button>
    <Button variant='danger' onClick={() => { props.deleteAnswer(props.id) }}><Trash /></Button>
  </td>
}

export { Answers };