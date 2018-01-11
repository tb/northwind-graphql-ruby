import React from 'react';
import {Form, Button} from 'reactstrap';
import {Field} from 'formik';

import TextInput from '../../components/Form/TextInput';

export default ({handleSubmit, values}) => (
  <Form onSubmit={handleSubmit}>
    <Field component={TextInput} name="product_name" label="Product Name" />
    {values.image_url && <img src={values.image_url} alt="Product" />}
    <Field component={TextInput} name="image_url" label="Image URL" />
    <Field component={TextInput} name="category" label="Category" />
    <Button type="submit" color="success" size="sm">
      {values.id ? 'Save Changes' : 'Create'}
    </Button>
  </Form>
);
