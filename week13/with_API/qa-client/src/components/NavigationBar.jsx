import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types'; // Import PropTypes

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

// Add prop validation
NavigationBar.propTypes = {
  toggleLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired, // Add language prop validation
};


export default NavigationBar;
