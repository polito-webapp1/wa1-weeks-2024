import { Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ArrowUp, PencilSquare, Trash } from 'react-bootstrap-icons';

function Answers(props) {
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
    </>
  );
}

Answers.propTypes = {
  answers: PropTypes.array,
}


function AnswerTable(props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id} deleteAnswer={props.deleteAnswer} voteUp={props.voteUp}/>)
        }
      </tbody>
    </Table>
  );
}

AnswerTable.propTypes = {
  answers: PropTypes.array,
}

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerActions deleteAnswer={props.deleteAnswer} voteUp={props.voteUp} id={props.answer.id} />
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
    <Button variant='warning' onClick={()=>{props.voteUp(props.id)}}><ArrowUp /></Button>
    <Button variant='primary' className='mx-1'><PencilSquare /></Button>
    <Button variant='danger' onClick={()=>{props.deleteAnswer(props.id)}}><Trash /></Button>
  </td>
}

export { Answers };