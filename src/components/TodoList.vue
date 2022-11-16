<template>
  <ul>
    <div v-for="task in todoList" :key="`${task.id}-${task.content}`">
      <li
        @click.self="$emit('modify', task.id)"
        :class="{ done: task.status === 'done' }"
      >
        {{ task.content }}
      </li>
      <button @click="$emit('remove', task.id)" class="removeBtn">X</button>
    </div>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['todoList']
});
</script>

<style>
ul {
  border: solid 1px gray;
  /* list-style: inside; */
  width: 100%;
}

ul div {
  display: flex;
  border-bottom: solid 1px gray;
}

ul li {
  cursor: pointer;
  display: flex;
  font-size: 1.25em;
  justify-content: space-between;
  padding: 12px;
  width: 100%;
}

ul li span:hover {
  color: red;
}

ul button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: default;
  outline: inherit;
  margin-right: 15px;
}

ul button:hover {
  color: red;
}

ul:last-child {
  border-bottom: none;
}

.done {
  text-decoration: line-through;
}

.removeBtn {
  text-decoration: none;
}
</style>