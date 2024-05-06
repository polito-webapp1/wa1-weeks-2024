import { Container, Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState } from "react";


function QuestionComponent(props) {


  const number = props.qtnnumber;
  const question = props.question;
  const email = props.email

  return (
    <Container>
      <Row>
        <Col md={3}>
          <p>{number}</p>
        </Col>
        <Col md={3}>
          <p>{question}</p>
        </Col>
        <Col md={3}>
          <p>{email}</p>
        </Col>
        <Col onClick={props.increaseLikes}>
        Likes: {props.likes}</Col>
      </Row>
    </Container>
  )
}

QuestionComponent.propTypes = {
  qtnnumber: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default QuestionComponent
