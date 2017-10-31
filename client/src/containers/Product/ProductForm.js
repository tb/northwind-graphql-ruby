import React from 'react';
import {Form, Button} from 'reactstrap';
import {Field} from 'formik';

import TextInput from '../../components/Forms/TextInput';

export default ({handleSubmit, values}) => (
  <Form onSubmit={handleSubmit}>
    <Field component={TextInput} name="product_name" label="Product Name" />
    <Field component={TextInput} name="category" label="Category" />
    <Button type="submit" color="success" size="sm">
      {values.id ? 'Save Changes' : 'Create'}
    </Button>
  </Form>
);
