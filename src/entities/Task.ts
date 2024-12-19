import propsVerifier from '../verifiers/taskPropsVerifier';

export interface TaskProps {
  id?: number;
  title: string;
  description?: string;
  status: string;
  userId: number;
  createdAt?: Date;
}

export class Task {
  constructor(private taskProps: TaskProps) {
    const hasErrors = propsVerifier.isErrorInTaskProps(taskProps);

    if (hasErrors) {
      hasErrors;
    }
  }

  get id() {
    return this.taskProps.id;
  }

  get title() {
    return this.taskProps.title;
  }

  get description() {
    return this.taskProps.description;
  }

  get status() {
    return this.taskProps.status;
  }

  get userId() {
    return this.taskProps.userId;
  }

  get createdAt() {
    return this.taskProps.createdAt;
  }
}
