/* eslint-disable newline-per-chained-call */
import Joi from 'joi-browser';

// password
const schema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

export default function validate(user) {
  return Joi.validate(user, schema);
}

export function validateChange(type, value) {
  const loginSchema = {
    login: Joi.string().alphanum().min(3).max(30),
  };
  const emailSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
  };
  const passwordSchema = {
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
  };
  switch (type) {
    case 'login':
      return Joi.validate({ login: value }, loginSchema);
    case 'email':
      return Joi.validate({ email: value }, emailSchema);
    case 'password':
      return Joi.validate({ password: value }, passwordSchema);
    default:
      return null;
  }
}
