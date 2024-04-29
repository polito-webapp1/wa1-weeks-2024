import { Container, Navbar } from 'react-bootstrap';


import PropTypes from 'prop-types';

function NavigationBar(props) {
  return (
    <Navbar bg='light'>
      <Container fluid>
        <Navbar.Brand>HeapOverrun {props.qtnnumber}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

NavigationBar.propTypes = {
  qtnnumber: PropTypes.number.isRequired,
};

export default NavigationBar;
