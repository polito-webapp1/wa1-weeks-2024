import { Button, Container, Navbar } from 'react-bootstrap';


import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavigationBar(props) {
  return (
    <Navbar bg='light'>
      <Container fluid>
        <Navbar.Brand><Link to='/'>HeapOverrun</Link></Navbar.Brand>
        <Button onClick={props.toggleLanguage}>{props.language}</Button>
      </Container>
    </Navbar>
  )
}

NavigationBar.propTypes = {
  qtnnumber: PropTypes.number.isRequired,
};

export default NavigationBar;
