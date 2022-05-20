import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => 
  bcrypt.genSalt(10)
    .then((salt => bcrypt.hash(password, salt)))
    .then(hash => hash);

export const comparePassword = (password: string, hash: string) => 
  bcrypt.compare(password, hash).then(resp => resp)