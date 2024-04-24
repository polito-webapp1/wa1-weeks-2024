import { Container, Col, Row } from "react-bootstrap";

function QuestionComponent(props) {

  const number = props.qtnnumber;
  const question = props.question;
  const email = props.email

  return (
    <Container>
      <Row>
        <Col md={4}>
          <p>{number}</p>
        </Col>
        <Col md={4}>
          <p>{question}</p>
        </Col>
        <Col md={4}>
          <p>{email}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default QuestionComponent
