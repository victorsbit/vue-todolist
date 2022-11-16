<template>
  <main>
    <h1>Todo List</h1>
    <div>
      <form :onSubmit="addTask">
        <input v-model="input" placeholder="type your task here" />
        <button type="submit" :disabled="isDisabled">Add task</button>
      </form>
    </div>
    <div class="list-container">
      <TodoList
        v-if="todoList.length >= 1"
        :todoList="todoList"
        @remove="removeTask"
        @modify="modifyTask"
      />
      <span v-else>No task added</span>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import TodoList from './components/TodoList.vue';
import { createTask } from './helpers/createTask';
import './style.css';

export default defineComponent({
  components: { TodoList },
  setup() {
    const isDisabled = ref(true);
    const todoList = ref([]);
    const input = ref('');

    watch(input, () => {
      if (input.value.length >= 1) {
        isDisabled.value = false;
      } else {
        isDisabled.value = true;
      }
    });

    const addTask = (e) => {
      e.preventDefault();

      const newTask = createTask(input.value);

      todoList.value = [...todoList.value, newTask];
      input.value = '';
    }

    const removeTask = (taskId) => {
      const newList = todoList.value.filter(({id}) => id !== taskId);

      todoList.value = newList;
    }

    const modifyTask = (taskId) => {
      const newList = todoList.value.map((task) => {
        if (task.id === taskId) {
          if (task.status === 'pending') return { ...task, status: 'done' }
          if (task.status === 'done') return { ...task, status: 'pending' }
        }

        return task;
      });

      todoList.value = newList;
    }

    return { isDisabled, todoList, input, addTask, removeTask, modifyTask };
  },
});
</script>

<style>
main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 75px;
  widows: 100vw;
}

main h1 {
  padding: 20px;
}

.list-container {
  display: flex;
  justify-content: center;
  width: 500px;
}

.list-container span {
  color: gray;
  font-style: italic;
}

input {
  border: 1px solid gray;
  border: none;
  appearance: none;
  background: #F2F2F2;
  padding: 10px;
  border-radius: 3px;
  outline: none;
  margin: 5px;
  width: 250px;
}

input:focus::placeholder {
  color: transparent;
}

input::placeholder {
  color: var(gray);
  transition: color 0.3s ease;
}

form {
  margin: 50px;
}

form button {
  height: 30px;
  width: 100px;
}
</style>