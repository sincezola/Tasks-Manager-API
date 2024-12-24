import { User } from './User';

describe('Instanciate an User', () => {
  it('Should not be able to create a user without name', () => {
    const userProps = {
      name: '',
      email: 'fredericocapa@gmail.com',
      password: '543242',
    };

    expect(() => new User(userProps)).toThrow();
  });

  it('Should not be able to create a user with a id minor than 1', () => {
    const userProps = {
      id: 0,
      name: 'Frederico',
      email: 'fredericocapa@gmail.com',
      password: '543242',
    };

    expect(() => new User(userProps)).toThrow();
  });

  it('Should not be able to create a user with an invalid email', () => {
    const userProps = {
      name: 'Frederico',
      email: 'fredericocapagmail',
      password: '543242',
    };

    expect(() => new User(userProps)).toThrow();
  });

  it('Should not be able to create a user with a password that has less than 6 characters', () => {
    const userProps = {
      name: 'Frederico',
      email: 'fredericocapagmail.com',
      password: '54324',
    };

    expect(() => new User(userProps)).toThrow();
  });

  it('Should not be able to create a user with an invalid email', () => {
    const userProps = {
      name: 'Frederico',
      email: 'fredericocapagmail',
      password: '543242',
    };

    expect(() => new User(userProps)).toThrow();
  });

  it('Should be able to create a user with correct props', () => {
    const userProps = {
      id: 220,
      name: 'Frederico',
      email: 'fredericocapa@gmail.com',
      password: '543242',
      createdAt: new Date(),
    };

    const user = new User(userProps);
    expect(user).toBeInstanceOf(User);
  });
});
