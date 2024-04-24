import { Container, Navbar } from 'react-bootstrap';


function NavigationBar(props) {

  return (
    <Navbar bg='primary'>
      <Container fluid>
        <Navbar.Brand>HeapOverrun {props.qtnnumber}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
