/* eslint-disable newline-per-chained-call */
import PasswordValidator from 'password-validator';

const schema = new PasswordValidator();

schema
  .is().min(8)
  .is().max(32)
  .has().digits()
  .has().not().spaces();

export default function validate(password) {
  return schema.validate(password, { list: true });
}
