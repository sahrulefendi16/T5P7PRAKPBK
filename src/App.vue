<template>
  <div id="app">
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">
            <span class="title-icon">✓</span>
            Todo List Kuu
          </h1>
          <p class="app-subtitle">Kelola tugas Anda dengan mudah</p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-wrapper">
          <!-- Form untuk menambah todo -->
          <TodoForm />
          
          <!-- List todo -->
          <TodoList />
        </div>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <p>&copy; 2024 Todo App - Vue.js & Pinia - Sahrul Efendi (233510312)</p>
      </footer>
    </div>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList
  }
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #078ccf 0%, #097cc9 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.app-header {
  text-align: center;
  padding: 3rem 1rem 2rem;
  position: relative;
  z-index: 1;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.app-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.main-content {
  flex: 1;
  padding: 0 1rem 2rem;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.app-footer {
  text-align: center;
  padding: 2rem 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-header {
    padding: 2rem 1rem 1.5rem;
  }
  
  .app-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .title-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .main-content {
    padding: 0 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
  }
  
  .title-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
  
  .app-subtitle {
    font-size: 0.9rem;
  }
}

/* Loading Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-header,
.main-content {
  animation: fadeInUp 0.6s ease-out;
}

.main-content {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Focus Styles */
*:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

button:focus,
input:focus {
  outline: 2px solid rgba(255, 255, 255, 0.7);
}
</style>