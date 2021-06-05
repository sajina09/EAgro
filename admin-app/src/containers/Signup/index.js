import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';


/**
* @author
* @function Signup

**/

const Signup
  = (props) => {

    const [firstName, setFrirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    
    const userSignup = (e) =>{
      e.preventDefault();
      const user = {
        firstName , lastName , email , password
      }
      dispatch(signup(user));
    }
 
    if (auth.authenticate) {
      return <Redirect to={'/'} />
    }

    if(user.loading) {
      return <p>Loading ... </p>
    }

    return (
      <Layout>
        <Container>
          { user.message}
          <Row style={{ marginTop: "5%" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="FirstName"
                      placeholder="First Name"
                      value={firstName}
                      type="text"
                      onChange={(e) => setFrirstName(e.target.value)}

                    />
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}

                    />
                  </Col>
                </Row>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}

                />

                <Input
                  label="Passowrd"
                  placeholder="Passowrd"
                  value={password}
                  type="Passowrd"
                  onChange={(e) =>setPassword(e.target.value)}

                />
                <Button type="submit" style={{background :'#59b791'}}>
                  Submit
            </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    )

  }

export default Signup ;
