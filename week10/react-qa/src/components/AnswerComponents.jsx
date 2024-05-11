import { Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ArrowUp, PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState } from 'react';
import AnswerForm from './AnswerForm';

function Answers(props) {

  const [mode, setMode] = useState('default');

  const [editableAnswer, setEditableAnswer] = useState();

  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode('edit');
  }

  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} deleteAnswer={props.deleteAnswer} voteUp={props.voteUp} handleEdit={handleEdit}></AnswerTable>
        </Col>
      </Row>
      {mode === 'add' &&
        <AnswerForm
          mode = {mode}
          addAnswer={(answer) => {props.addAnswer(answer); setMode('default');}}
          cancel={() => setMode('default')}
        />
      }

      {mode === 'edit' &&
        <AnswerForm
          mode={mode}
          answer={editableAnswer}
          cancel={() => setMode('default')}
          updateAnswer={(answer) => { props.updateAnswer(answer); setMode('default'); }}
        />
      }

      {mode === 'default' && <Button variant='primary' onClick={() => {setMode('add');}}>Add</Button>}
      
      <h5>{mode}</h5>
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
            sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} deleteAnswer={props.deleteAnswer} voteUp={props.voteUp} handleEdit={props.handleEdit} />)
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
  return <td>
    <Button variant='warning' onClick={() => { props.voteUp(props.id) }}><ArrowUp /></Button>
    <Button variant='primary' className='mx-1' onClick={() => { props.handleEdit(props.answer) }}><PencilSquare /></Button>
    <Button variant='danger' onClick={() => { props.deleteAnswer(props.id) }}><Trash /></Button>
  </td>
}

export { Answers };