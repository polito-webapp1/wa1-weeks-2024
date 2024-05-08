import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import dayjs from 'dayjs';

function AnswerForm(props){

  //const [text, setText] = useState('');
  //const [email, setEmail] = useState('');
  //const [date, setDate] = useState('');

  // If the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), the initial state of its fields is set to the values of the passed answer; otherwise, we initialize it as empty

  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [email, setEmail] = useState(props.answer ? props.answer.email : '');
  const [date, setDate] = useState(props.answer ? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event) => {
    event.preventDefault();

    const answer = {text, email, date};

    // Similarly, if the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), we invoke updateAnswer; otherwise, we invoke addAnswer.
    
    if(props.answer) {
      props.updateAnswer({id: props.answer.id, ...answer});
    }
    else {
      props.addAnswer(answer);
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>
          Text
        </Form.Label>
        <Form.Control type='text' required={true} minLength={2} value={text} onChange={(event)=>setText(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control type='email' required={true} value={email} onChange={(event)=>setEmail(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Date
        </Form.Label>
        <Form.Control type='date' value={date} onChange={(event)=>setDate(event.target.value)}>
        </Form.Control>
      </Form.Group>
      {props.mode==='add' && <Button variant='primary' type='Submit'>Add</Button>}
      {props.mode==='edit' && <Button variant='primary' type='Submit'>Edit</Button>}
      {' '}
      <Button variant='danger' onClick={props.cancel}>Cancel</Button>
    </Form>
  )
}

export default AnswerForm;