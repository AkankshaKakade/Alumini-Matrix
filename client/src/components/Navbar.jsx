import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function NavbarComp() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Alumni Manager</Navbar.Brand>
        <Nav className="me-auto">
          {user && <Nav.Link as={Link} to="/alumni">Alumni</Nav.Link>}
          {user && <Nav.Link as={Link} to="/alumni/new">Add Alumni</Nav.Link>}
        </Nav>
        <Nav>
          {user ? (
            <>
              <Navbar.Text className="me-2">{user.name}</Navbar.Text>
              <Button variant="outline-light" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
