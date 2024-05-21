import { Container, Col, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";


function QuestionComponent(props) {

  const params = useParams();
  const number = params.qid

  const question = props.question.text;
  const email = props.question.email;

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <p>{number}</p>
          </Col>
          <Col md={6}>
            <p>{question}</p>
          </Col>
          <Col md={4}>
            <p>{email}</p>
          </Col>
        </Row>
      </Container>
      <Outlet></Outlet>
    </>
  )
}

export default QuestionComponent
