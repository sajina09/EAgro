import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Col,Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function Signin

**/

const Signin = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault();

    const user = {
     email, password
    }
    dispatch(login(user));
   }

   if(auth.authenticate) {
    return <Redirect to={'/'} />
  }

  
    return (
      <Layout>
        <Container>
         <Row style={{marginTop: "5%"}}>
           <Col md={{span:6 , offset: 3}}>
           <Form onSubmit ={userLogin}>
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
                        onChange={(e) => setPassword(e.target.value)}
                  
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
export default Signin ;
