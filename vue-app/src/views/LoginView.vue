<template>
  <div class="login-wrapper">
    <div class="overlay"></div>

    <div class="login-card">
      <img src="/images/icons/logo.png" alt="Pato Restaurant" class="logo" />

      <h2>Panel Administrativo</h2>
      <p>Gestión inteligente del restaurante</p>

      <form @submit.prevent="login">
        <div class="form-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            v-model="email"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="password"
            required
          />
        </div>

        <button class="login-btn">
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Login:', email.value, password.value)
  // Aquí conectarás tu backend o Supabase
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: url('/images/bg-title-page-03.jpg') center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.6);
}

.login-card {
  position: relative;
  background: #fff;
  width: 100%;
  max-width: 420px;
  padding: 45px 40px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,.25);
  animation: fadeUp .6s ease;
}

.logo {
  width: 120px;
  margin-bottom: 15px;
}

h2 {
  margin: 0;
  font-weight: 700;
  color: #111;
}

p {
  margin-bottom: 30px;
  color: #777;
  font-size: 14px;
}

.form-group {
  margin-bottom: 18px;
}

input {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: all .3s;
}

input:focus {
  border-color: #ec1d25;
}

.login-btn {
  width: 100%;
  padding: 13px;
  background: #ec1d25;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: .3s;
}

.login-btn:hover {
  background: #c4171d;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
