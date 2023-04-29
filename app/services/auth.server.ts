import { Authenticator, AuthorizationError } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import bcrypt from 'bcryptjs';
import { getDatabaseClient } from './database-server';

const authenticator = new Authenticator<any>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email') as string;
  const password = form.get('password') as string;

  const database = getDatabaseClient();
  const user = database.db.users.find(user => user.email === email);

  if (!user) {
    throw new AuthorizationError();
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!passwordsMatch) {
    throw new AuthorizationError();
  }
  return user;
});

authenticator.use(formStrategy, 'form');

export { authenticator };
