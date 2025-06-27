<template>
  <div class="todo-list">
    <div v-if="todoStore.todos.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <p class="empty-text">Belum ada tugas. Tambahkan tugas pertama Anda!</p>
    </div>
    
    <div v-else class="todos-container">
      <div 
        v-for="todo in todoStore.todos" 
        :key="todo.id"
        class="todo-item"
        :class="{ 'completed': todo.completed }"
      >
        <div class="todo-content">
          <button 
            @click="toggleTodo(todo.id)"
            class="checkbox-btn"
            :class="{ 'checked': todo.completed }"
          >
            <span class="checkmark">{{ todo.completed ? '✓' : '' }}</span>
          </button>
          
          <span 
            class="todo-text"
            :class="{ 'strikethrough': todo.completed }"
          >
            {{ todo.text }}
          </span>
        </div>
        
        <div class="todo-actions">
          <button 
            @click="editTodo(todo)"
            class="action-btn edit-btn"
            title="Edit tugas"
          >
            ✏️
          </button>
          
          <button 
            @click="deleteTodo(todo.id)"
            class="action-btn delete-btn"
            title="Hapus tugas"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- untuk edit todo -->
    <div v-if="editingTodo" class="modal-overlay" @click="cancelEdit">
      <div class="modal" @click.stop>
        <h3 class="modal-title">Edit Tugas</h3>
        <input 
          v-model="editText"
          type="text"
          class="edit-input"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
          ref="editInput"
        />
        <div class="modal-actions">
          <button @click="saveEdit" class="save-btn">Simpan</button>
          <button @click="cancelEdit" class="cancel-btn">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default {
  name: 'TodoList',
  setup() {
    const todoStore = useTodoStore()
    const editingTodo = ref(null)
    const editText = ref('')
    const editInput = ref(null)

    const toggleTodo = (id) => {
      todoStore.toggleTodo(id)
    }

    const deleteTodo = (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        todoStore.deleteTodo(id)
      }
    }

    const editTodo = async (todo) => {
      editingTodo.value = todo
      editText.value = todo.text
      await nextTick()
      editInput.value?.focus()
    }

    const saveEdit = () => {
      if (editText.value.trim()) {
        todoStore.editTodo(editingTodo.value.id, editText.value.trim())
      }
      cancelEdit()
    }

    const cancelEdit = () => {
      editingTodo.value = null
      editText.value = ''
    }

    return {
      todoStore,
      editingTodo,
      editText,
      editInput,
      toggleTodo,
      deleteTodo,
      editTodo,
      saveEdit,
      cancelEdit
    }
  }
}
</script>

<style scoped>
.todo-list {
  margin-top: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.1rem;
  margin: 0;
}

.todos-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  animation: slideInLeft 0.3s ease-out;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.todo-item.completed {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.05);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.checkbox-btn {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox-btn:hover {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.checkbox-btn.checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.checkmark {
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.todo-text {
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  word-break: break-word;
}

.todo-text.strikethrough {
  text-decoration: line-through;
  opacity: 0.6;
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
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 14px;
}

.edit-btn {
  background: rgba(33, 150, 243, 0.2);
  color: #2196F3;
}

.edit-btn:hover {
  background: rgba(33, 150, 243, 0.3);
  transform: scale(1.1);
}

.delete-btn {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.delete-btn:hover {
  background: rgba(244, 67, 54, 0.3);
  transform: scale(1.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  min-width: 400px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-title {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.edit-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.edit-input:focus {
  border-color: #4CAF50;
  outline: none;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.save-btn, .cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.save-btn:hover {
  background: #45a049;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.cancel-btn:hover {
  background: #da190b;
}

@media (max-width: 768px) {
  .todo-item {
    padding: 1rem;
  }
  
  .modal {
    min-width: 300px;
    padding: 1.5rem;
  }
  
  .todo-actions {
    opacity: 1;
  }
}

/* Animasi */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>