import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-dark text-white min-vh-100 p-3">
            <h4 className="text-center mb-4">Alumni Manager</h4>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/dashboard" className="text-white">🏠 Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/alumni" className="text-white">👥 Alumni List</Nav.Link>
              <Nav.Link as={Link} to="/add-alumni" className="text-white">➕ Add Alumni</Nav.Link>
              <Nav.Link onClick={logout} className="text-white">🚪 Logout</Nav.Link>
            </Nav>
          </Col>

          {/* Main content */}
          <Col md={10} className="p-4" style={{ background: '#f9f9f9', minHeight: '100vh' }}>
            <Outlet />
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
