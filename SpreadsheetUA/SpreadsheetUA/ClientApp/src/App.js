import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { AddAdvertPage } from './AddAdvert';


export default () => (
  <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/registration' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/addadvert' component={AddAdvertPage} />
  </Layout>
);
