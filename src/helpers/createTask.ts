import { uuid } from 'vue-uuid';

export const createTask = (inputValue: string) => {
  const newTask = {
    id: uuid.v4(),
    content: inputValue,
    status: 'pending'
  }

  return newTask;
}
