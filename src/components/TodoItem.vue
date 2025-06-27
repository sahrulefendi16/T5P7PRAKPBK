<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <button
        @click="toggleTodo"
        class="toggle-btn"
        :class="{ checked: todo.completed }"
      >
        <svg v-if="todo.completed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </button>

      <div class="todo-text-container" v-if="!isEditing">
        <span
          class="todo-text"
          :class="{ completed: todo.completed }"
          @dblclick="startEdit"
        >
          {{ todo.text }}
        </span>
        <small class="todo-date">
          {{ formatDate(todo.createdAt) }}
        </small>
      </div>

      <input
        v-else
        v-model="editText"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        class="edit-input"
        ref="editInput"
      />
    </div>

    <div class="todo-actions">
      <button
        v-if="!isEditing"
        @click="startEdit"
        class="action-btn edit-btn"
        title="Edit"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m18 2 4 4-16 16H2v-4L18 2z"></path>
        </svg>
      </button>

      <button
        @click="removeTodo"
        class="action-btn delete-btn"
        title="Delete"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const todoStore = useTodoStore()
    const isEditing = ref(false)
    const editText = ref('')
    const editInput = ref(null)

    const toggleTodo = () => {
      todoStore.toggleTodo(props.todo.id)
    }

    const removeTodo = () => {
      todoStore.removeTodo(props.todo.id)
    }

    const startEdit = () => {
      if (props.todo.completed) return
      
      isEditing.value = true
      editText.value = props.todo.text
      nextTick(() => {
        editInput.value?.focus()
        editInput.value?.select()
      })
    }

    const saveEdit = () => {
      if (editText.value.trim() && editText.value !== props.todo.text) {
        todoStore.editTodo(props.todo.id, editText.value)
      }
      isEditing.value = false
    }

    const cancelEdit = () => {
      isEditing.value = false
      editText.value = props.todo.text
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    return {
      isEditing,
      editText,
      editInput,
      toggleTodo,
      removeTodo,
      startEdit,
      saveEdit,
      cancelEdit,
      formatDate
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.todo-item.completed {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.6);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.toggle-btn {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.toggle-btn:hover {
  border-color: #667eea;
}

.toggle-btn.checked {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.todo-text-container {
  flex: 1;
  min-width: 0;
}

.todo-text {
  display: block;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  word-wrap: break-word;
  cursor: pointer;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #888;
}

.todo-text:hover {
  color: #667eea;
}

.todo-date {
  display: block;
  color: #888;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.edit-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.todo-item:hover .todo-actions {
  opacity: 1;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: transparent;
}

.edit-btn {
  color: #667eea;
}

.edit-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #5a67d8;
}

.delete-btn {
  color: #e53e3e;
}

.delete-btn:hover {
  background: rgba(229, 62, 62, 0.1);
  color: #c53030;
}

@media (max-width: 768px) {
  .todo-item {
    padding: 0.75rem 1rem;
  }
  
  .todo-actions {
    opacity: 1;
  }
  
  .action-btn {
    padding: 0.375rem;
  }
}
</style>