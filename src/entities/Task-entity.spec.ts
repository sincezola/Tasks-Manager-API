import { Task } from './Task';

describe('Instanciate an task', () => {
  it('Should not be able to create a task without title', () => {
    const taskProps = {
      title: '',
      description: 'Tenho que lavar a louça amanhã',
      status: 'pendente',
      userId: 1,
    };

    expect(() => new Task(taskProps)).toThrow();
  });

  it('Should not be able to create a task without status', () => {
    const taskProps = {
      title: 'Lavar a louça',
      description: 'Tenho que lavar a louça amanhã',
      status: '',
      userId: 1,
    };

    expect(() => new Task(taskProps)).toThrow();
  });

  it('Should not be able to create a task with a title that has less than 4 characters', () => {
    const taskProps = {
      title: 'Lav',
      description: 'Tenho que lavar a louça amanhã',
      status: 'pendente',
      userId: 1,
    };

    expect(() => new Task(taskProps)).toThrow();
  });

  it('Should be able to create a Task without description', () => {
    const taskProps = {
      title: 'Lavar a louça',
      status: 'Em progresso',
      userId: 1,
    };

    const task = new Task(taskProps);
    expect(task).toBeInstanceOf(Task);
  });

  it('Should be able to create a task with correct props', () => {
    const taskProps = {
      title: 'Lavar a louça',
      description: 'Tenho que lavar a louça amanhã',
      status: 'pendente',
      userId: 2,
    };

    const task = new Task(taskProps);
    expect(task).toBeInstanceOf(Task);
  });
});
