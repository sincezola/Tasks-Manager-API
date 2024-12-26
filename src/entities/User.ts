import propsVerifier from '../class-instanciate-verifiers/userPropsVerifier';

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  constructor(private userProps: UserProps) {
    const hasErrors = propsVerifier.isErrorInUserProps(userProps);

    if (hasErrors) {
      hasErrors;
    }
  }

  get id() {
    return this.userProps.id;
  }

  get name() {
    return this.userProps.name;
  }

  get email() {
    return this.userProps.email;
  }

  get password() {
    return this.userProps.password;
  }

  get createdAt() {
    return this.userProps.createdAt;
  }
}
