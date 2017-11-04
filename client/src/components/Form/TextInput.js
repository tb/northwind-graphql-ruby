import React from 'react';
import {FormGroup, Label, Input, FormFeedback} from 'reactstrap';

const TextInput = ({
  field: {name, ...field},
  form: {touched, errors},
  ...props
}) => (
  <FormGroup>
    {props.label && <Label>{props.label}</Label>}
    <Input type="text" autoComplete="off" {...field} name={name} />
    {errors[name] && <FormFeedback>{errors[name]}</FormFeedback>}
  </FormGroup>
);

export default TextInput;
