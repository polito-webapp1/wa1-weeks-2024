import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types'; // Import the 'PropTypes' package

/**
 * Initialize the form with the current value of the question to be edited, and then render the Add/Edit form with its initial value
 */
function EditAnswerForm(props) {
  const params = useParams();
  const aid = params.aid;

  const find_answer = props.answers.filter(a => a.id == aid)
  const answer = find_answer[0]

  return <AnswerForm answer={answer} mode='edit' updateAnswer={props.updateAnswer} />
}

EditAnswerForm.propTypes = {
  answers: PropTypes.array.isRequired,
  updateAnswer: PropTypes.func.isRequired
};


function AnswerForm(props) {

  // If the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), the initial state of its fields is set to the values of the passed answer; otherwise, we initialize it as empty

  const [email, setEmail] = useState(props.answer ? props.answer.email : '');
  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [date, setDate] = useState(props.answer ? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const answer = { text, email, date };

    // Similarly, if the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), we invoke updateAnswer; otherwise, we invoke addAnswer.

    if (props.answer) {
      console.log('handlesubmit', answer)
      props.updateAnswer({ id: props.answer.id, ...answer });
    }
    else {
      props.addAnswer(answer);
    }
    navigate('..'); // back to list of answers
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>
          Text
        </Form.Label>
        <Form.Control type='text' required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control type='email' required={true} value={email} onChange={(event) => setEmail(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Date
        </Form.Label>
        <Form.Control type='date' value={date} onChange={(event) => setDate(event.target.value)}>
        </Form.Control>
      </Form.Group>
      {props.mode === 'add' && <Button variant='primary' type='Submit'>Add</Button>}
      {props.mode === 'edit' && <Button variant='primary' type='Submit'>Edit</Button>}
      {' '}
      <Button variant='danger' onClick={() => { navigate('..') }}>Cancel</Button>
    </Form>
  )
}

AnswerForm.propTypes = {
  answer: PropTypes.object, // Add the 'answer' prop validation
  mode: PropTypes.string,
  addAnswer: PropTypes.func.isRequired // Add the 'addAnswer' prop validation
};


export { AnswerForm, EditAnswerForm };