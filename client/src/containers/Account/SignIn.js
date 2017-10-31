import React, {Component} from 'react';
import {Form, Button} from 'reactstrap';
import {Formik, Field} from 'formik';
import {Link} from 'react-router-dom';

import Card from './Card';
import TextInput from '../../components/Forms/TextInput';

const SignInForm = ({handleSubmit, errors}) => (
  <Form onSubmit={handleSubmit} style={{padding: '20px'}}>
    <Field
      component={TextInput}
      name="email"
      label="Email"
      autoComplete="off"
    />
    <Field
      component={TextInput}
      name="password"
      label="Password"
      type="password"
      autoComplete="off"
    />
    <Button type="submit">Sign In</Button>
    <span style={{marginLeft: '10px'}}>
      or <Link to={'/signup'}>Sign Up</Link>
    </span>
  </Form>
);

export class SignIn extends Component {
  _signIn = (values, actions) => console.log('_signIn', values);

  render() {
    return (
      <Card header={'Sign In'}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={this._signIn}
          component={SignInForm}
        />
      </Card>
    );
  }
}

export default SignIn;
