import { Container, Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState } from "react";
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
    <Outlet></Outlet>
    </>
  )
}

QuestionComponent.propTypes = {
}

export default QuestionComponent
