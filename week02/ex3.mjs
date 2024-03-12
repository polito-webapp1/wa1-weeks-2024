import dayjs from 'dayjs';

function Answer(response, user, score, date) {
    const category = 'computer science';
    this.response = response ;
    this.user = user ;
    this.score = score ;
    this.date = date ;

    this.voteUp = () => {this.score++;}
    this.getCategory = () => {return category ;}
}

function Question(text, user, date) {
    this.text = text ;
    this.user = user ;
    this.date = date ;
    this.answers = [] ;

    this.add = (answer) => { this.answers.push(answer) }
    this.find = (user) => this.answers.filter(a => a.user === user) ;
    this.afterDate = (date) => this.answers.filter(a => (a.date.isAfter(date) || a.date.isSame(date)))
    this.listByDate = () => {
        const ans = [...this.answers] ;
        ans.sort((a1, a2)=>(a1.date.valueOf()-a2.date.valueOf())) ;
        ans.sort((a1, a2)=> {
            if(a1.date.isBefore(a2.date))
                return -1 ;
            else if(a1.date.isAfter(a2.date))
                return +1 ;
            else 
                return 0 ;
        })
        return ans
    }
    this.listByScore = () => {
        const ans = [...this.answers]
        ans.sort((a1, a2)=>a1.score-a2.score)
        return ans
    }
}

const q1 = new Question('Are you happy?', 'fulvio', dayjs('2024-03-12')) ;

const a1 = new Answer('Yes', 'fulvio', 5, dayjs('2024-03-12'))
q1.add(a1)

q1.add(new Answer('Maybe', 'luigi', 0, dayjs()))
q1.add(new Answer('No', 'fulvio', -2, dayjs('2024-03-12')))
q1.add(new Answer('Undecided', 'luigi', 0, dayjs()))

// console.log(q1.find('luigi'))

// console.log(q1.afterDate(dayjs('2024-03-12')))

// console.log(q1.listByDate())

// console.log(q1.listByScore())