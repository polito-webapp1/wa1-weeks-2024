import { Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers}></AnswerTable>
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
          props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id} />)
        }
      </tbody>
    </Table>
  );
}

AnswerTable.propTypes = {
  answers: PropTypes.array,
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerActions /></tr>
  );
}

AnswerRow.propTypes = {
  answer: PropTypes.object,
}

function AnswerData(props) {
  return(
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

function AnswerActions() {
  return <td>
    <Button variant='warning'><i className='bi bi-arrow-up'></i></Button>
    <Button variant='primary' className='mx-1'><i className='bi bi-pencil-square'></i></Button> 
    <Button variant='danger'><i className='bi bi-trash'></i></Button>
  </td>
}

export { Answers };