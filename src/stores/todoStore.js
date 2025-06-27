import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const loadTodos = () => {
    try {
      const savedTodos = localStorage.getItem('todos')
      return savedTodos ? JSON.parse(savedTodos) : []
    } catch (error) {
      console.error('Error loading todos from localStorage:', error)
      return []
    }
  }

  const todos = ref(loadTodos())

  // Fungsi untuk menambah todo baru
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date()
    }
    todos.value.push(newTodo)
  }

  // Fungsi untuk toggle status completed
  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // Fungsi untuk menghapus
  const deleteTodo = (id) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  // Fungsi untuk edit
  const editTodo = (id, newText) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.text = newText
    }
  }

  // todos yang sudah selesai
  const completedTodos = computed(() => {
    return todos.value.filter(todo => todo.completed)
  })

  // todos yang belum selesai
  const pendingTodos = computed(() => {
    return todos.value.filter(todo => !todo.completed)
  })

  const saveTodos = () => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos.value))
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
    }
  }

  watch(todos, saveTodos, { deep: true })

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    completedTodos,
    pendingTodos
  }
})