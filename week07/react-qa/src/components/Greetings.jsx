function GreetingList(props) {

  const cnt = props.count;

  const greetings = [];
  for (let i = 0; i < cnt; i++) {
    greetings.push(<Greeting text={props.text} />)
  }

  return (<div>{greetings}</div>)

}

function Greeting(props) {
  return (
    <>
      <h2>Hello, {props.text}</h2>
    </>
  )
}

export { GreetingList };