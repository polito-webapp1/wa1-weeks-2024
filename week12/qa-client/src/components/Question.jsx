import { Container, Col, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";


function QuestionComponent({likes, increaseLikes, questions}) {

  const params = useParams();
  const number = params.qid

  const question = questions.filter((q)=>q.id==number)[0];
  console.log(question)
  const email = question.email;

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <p>{number}</p>
          </Col>
          <Col md={6}>
            <p>{question.text}</p>
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
