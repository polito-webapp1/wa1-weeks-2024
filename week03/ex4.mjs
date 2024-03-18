import dayjs from 'dayjs';

function Answer(id, text, email, date, score = 0) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.score = score;
    this.date = dayjs(date);
  
    this.toString = () => {
      return `${this.email} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
  }

  function Question(id, text, email, date) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);
  
    this.toString = () => {
      return `Question '${this.text}' asked by ${this.email} on ${this.date.format('YYYY-MM-DD')}.`;
    }
  }  