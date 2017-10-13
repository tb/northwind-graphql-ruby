import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const TextInput = ({ field: { name, ...field },  form: { touched, errors }, ...props}) =>
  <FormGroup>
    <Label>Supplier Name</Label>
    <Input type="text" {...field} name={name} />
    {errors[name] && <FormFeedback>{errors[name]}</FormFeedback>}
  </FormGroup>;

export default TextInput;