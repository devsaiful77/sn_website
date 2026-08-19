<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login, loading } = useAuth()

const form = reactive({ email: '', password: '', remember: true })
const errors = reactive({ email: '', password: '' })
const serverError = ref('')
const showPw = ref(false)

function validate() {
  errors.email = ''
  errors.password = ''
  let ok = true
  if (!form.email.trim()) { errors.email = 'Email is required.'; ok = false }
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) { errors.email = 'Enter a valid email.'; ok = false }
  if (!form.password) { errors.password = 'Password is required.'; ok = false }
  return ok
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return
  try {
    await login({ email: form.email, password: form.password })
    const target = route.query.redirect || '/admin'
    router.replace(target)
  } catch (e) {
    serverError.value = e.message || 'Login failed. Please try again.'
  }
}
</script>

<template>
  <div class="sn-login">
    <!-- brand / blueprint side -->
    <aside class="sn-login-aside">
      <div class="sn-login-brand">
        <div class="sn-gear">S<br />N</div>
        <div>
          <b>SN Engineering Works</b>
          <span>Reliable engineering solutions</span>
        </div>
      </div>

      <div class="sn-login-pitch">
        <h2>Manage your site with precision.</h2>
        <p>Update services, projects, gallery and enquiries from one control panel — everything the public site shows, in your hands.</p>
      </div>

      <div class="sn-login-meta">
        <div>
          <div class="num">120+</div>
          <div class="cap">Projects delivered</div>
        </div>
        <div>
          <div class="num">15</div>
          <div class="cap">Years in service</div>
        </div>
        <div>
          <div class="num">24/7</div>
          <div class="cap">Support</div>
        </div>
      </div>
    </aside>

    <!-- form side -->
    <section class="sn-login-form-wrap">
      <div class="sn-login-card">
        <h1>Sign in</h1>
        <p class="sub">Enter your credentials to access the admin panel.</p>

        <div v-if="serverError" class="sn-alert-err">
          <span>⚠</span><span>{{ serverError }}</span>
        </div>

        <form @submit.prevent="onSubmit" novalidate>
          <div class="sn-field">
            <label for="email">Email address</label>
            <div class="sn-input-ic">
              <span class="lead">✉</span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="username"
                class="sn-input"
                :class="{ err: errors.email }"
                placeholder="admin@snengineeringworks.com"
              />
            </div>
            <div v-if="errors.email" class="msg-err">{{ errors.email }}</div>
          </div>

          <div class="sn-field">
            <label for="password">Password</label>
            <div class="sn-input-ic">
              <span class="lead">🔒</span>
              <input
                id="password"
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                autocomplete="current-password"
                class="sn-input"
                :class="{ err: errors.password }"
                placeholder="••••••••"
              />
              <button type="button" class="eye" :aria-label="showPw ? 'Hide password' : 'Show password'" @click="showPw = !showPw">
                {{ showPw ? '🙈' : '👁' }}
              </button>
            </div>
            <div v-if="errors.password" class="msg-err">{{ errors.password }}</div>
          </div>

          <div class="sn-login-row">
            <label class="sn-check">
              <input type="checkbox" v-model="form.remember" /> Remember me
            </label>
            <a href="#" class="sn-link">Forgot password?</a>
          </div>

          <button type="submit" class="sn-btn sn-btn-primary sn-btn-block" :disabled="loading">
            <span v-if="loading" class="sn-spin"></span>
            <span>{{ loading ? 'Signing in…' : 'Sign in' }}</span>
          </button>
        </form>

        <div class="sn-demo-note">
          Demo credentials — <code>admin@snengineeringworks.com</code> / <code>admin123</code>
        </div>
      </div>
    </section>
  </div>
</template>
