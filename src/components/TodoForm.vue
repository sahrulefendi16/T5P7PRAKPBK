<template>
  <div class="todo-form">
    <div class="form-container">
      <h2 class="form-title">
        <span class="form-icon">📝</span>
        Tambah Tugas Baru
      </h2>
      <form @submit.prevent="addTodo" class="form">
        <div class="input-group">
          <input 
            v-model="newTodo" 
            type="text" 
            placeholder="Masukkan tugas baru..."
            class="todo-input"
            required
          />
          <button type="submit" class="add-btn" :disabled="!newTodo.trim()">
            <span class="btn-icon">+</span>
            Tambah
          </button>
        </div>
      </form>
      <div class="form-stats">
        <span class="stats-text">Total tugas: {{ todoStore.todos.length }}</span>
        <span class="stats-text">Selesai: {{ completedCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default {
  name: 'TodoForm',
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref('')

    const completedCount = computed(() => {
      return todoStore.todos.filter(todo => todo.completed).length
    })

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value.trim())
        newTodo.value = ''
      }
    }

    return {
      todoStore,
      newTodo,
      addTodo,
      completedCount
    }
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 2rem;
}

.form-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.form-icon {
  font-size: 1.25rem;
}

.form {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.todo-input {
  flex: 1;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.todo-input:focus {
  background: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.todo-input::placeholder {
  color: #666;
}

.add-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(76, 175, 80, 0.4);
}

.add-btn:active {
  transform: translateY(-1px);
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.form-stats {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .form-stats {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
  }
  
  .form-title {
    font-size: 1.25rem;
  }
  
  .todo-input, .add-btn {
    padding: 0.875rem 1rem;
  }
}

/* Animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-container {
  animation: slideInUp 0.5s ease-out;
}
</style>