import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function Register() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3>Register</h3>
        <Form onSubmit={submit}>
          <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control value={name} onChange={e=>setName(e.target.value)} required /></Form.Group>
          <Form.Group className="mb-2"><Form.Label>Email</Form.Label><Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></Form.Group>
          <Form.Group className="mb-2"><Form.Label>Password</Form.Label><Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
