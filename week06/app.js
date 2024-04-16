'use strict';

document.addEventListener('DOMContentLoaded', event => {
  console.log("Page loaded");
  const table  = document.getElementById("answers-table")

  // create/load the list of answers
  const question = getQuestion()
  loadAnswers(question)
  console.log(question)

  // generate the table content starting from this list
  for(const answer of question.answers) {
    const tr = document.createElement("tr")
    table.appendChild(tr)
    tr.innerHTML = `<td>${answer.date.format()}</td>
    <td>${answer.text}</td>
    <td>${answer.email}</td>
    <td>${answer.score}</td>`

    /*
    const td_date = document.createElement('td')
    tr.appendChild(td_date)
    td_date.innerText = answer.date.format('YYYY-DD-MM')

    const td_text = document.createElement('td')
    tr.appendChild(td_text)
    td_text.innerText = answer.text

    const td_auth = document.createElement('td')
    tr.appendChild(td_auth)
    td_auth.innerText = answer.email
  
    const td_score = document.createElement('td')
    tr.appendChild(td_score)
    td_score.innerText = answer.score
    */

    const td_actions = document.createElement('td')
    tr.appendChild(td_actions)
    const btn_vote = document.createElement('button')
    btn_vote.classList.add('btn', 'btn-warning')
    td_actions.appendChild(btn_vote)
    const icon_vote = document.createElement('i')
    icon_vote.classList.add('bi', 'bi-arrow-up')
    btn_vote.appendChild(icon_vote)
    btn_vote.id = 'answer-'+answer.id
    btn_vote.answerId = answer.id
    btn_vote.addEventListener('click', (event)=>{
      console.log('up!', event.currentTarget)
      console.log('storing in DOM node', event.currentTarget.answerId)
      const the_answer = answer
      console.log('remembering through closure', the_answer.id)
      the_answer.score += 1
      const the_score = event.currentTarget.parentNode.previousSibling
      the_score.innerText = the_answer.score

    })

    // td_actions.innerHTML = `<button class="btn btn-warning"><i class='bi bi-arrow-up'></i></button>
    // <button class="btn btn-primary"><i class='bi bi-pencil-square'></i></button>
    // <button class="btn btn-danger"><i class='bi bi-trash'></i></button>`

  }


})

function getQuestion() {
  return new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", '2024-04-16')
}
function loadAnswers(question) {
  question.addAnswer(new Answer(1, "Yes", "luca.mannella@polito.it", '2024-02-15', -10))
  question.addAnswer(new Answer(2, "Not in a million year", "guido.vanrossum@python.org", '2024-03-01', 5))
}

function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.score = score;
  this.date = dayjs(date);
}

function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.answers = [];

  this.addAnswer = (answer) => {
    this.answers.push(answer);
  }

  this.getAnswers = () => {
    return [...this.answers];
  }
}