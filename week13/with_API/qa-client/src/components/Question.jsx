import { Container, Col, Row, Badge } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";


import PropTypes from 'prop-types';

function QuestionComponent({ questions }) {

  const params = useParams();
  const number = params.qid

  if (questions.length == 0) {
    return <Container>
      <Row>
        <Col>
          <p>No questions</p>
        </Col>
      </Row>
    </Container>
  }

  const filtered_questions = questions.filter((q) => q.id == number);

  if (filtered_questions.length != 1) {
    return <Container>
      <Row>
        <Col>
          <p>Question number <code>{number}</code> is invalid</p>
        </Col>
      </Row>
    </Container>
  }
  const question = filtered_questions[0]

  return (
    <>
      <Container>
        <Row>
          <Col md={1}>
            <h3><Badge>{number}</Badge></h3>
          </Col>
          <Col md={7}>
            <h3>{question.text}</h3>
          </Col>
          <Col md={4} align='right'>
            <Badge pill bg='secondary'>{question.email}</Badge>
          </Col>
        </Row>
      </Container>
      <Outlet></Outlet>
    </>
  )
}

QuestionComponent.propTypes = {
  questions: PropTypes.array.isRequired
};


export default QuestionComponent
