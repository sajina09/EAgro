import React from 'react';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import './style.css';
import { NavLink} from 'react-router-dom';
/**
* @author
* @function Home

**/
const Home
  = (props) => {

    return (
      <Layout sidebar >

        {/* <Jumbotron style={{margin:"5%" , background:""}} className="text-center">
            <h2>Welcome to Admin Dashboard</h2>
        </Jumbotron> */}
      </Layout>
    )

  }

export default Home
