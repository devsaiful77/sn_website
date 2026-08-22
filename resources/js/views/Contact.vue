<script setup>
import { reactive, ref } from 'vue'
import { submitContact } from '../services/contact'

const form = reactive({ name: '', email: '', phone: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', phone: '', subject: '', message: '' })
const submitting = ref(false)
const success = ref(false)
const serverError = ref('')

function clearErrors() {
  Object.keys(errors).forEach((k) => (errors[k] = ''))
  serverError.value = ''
}

// client-side validation
function validate() {
  clearErrors()
  let ok = true
  if (!form.name.trim()) { errors.name = 'Please enter your name.'; ok = false }
  if (!form.email.trim()) { errors.email = 'Email is required.'; ok = false }
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) { errors.email = 'Enter a valid email address.'; ok = false }
  if (form.phone && !/^[0-9+\-\s()]{6,20}$/.test(form.phone)) { errors.phone = 'Enter a valid phone number.'; ok = false }
  if (!form.message.trim()) { errors.message = 'Please write a message.'; ok = false }
  else if (form.message.trim().length < 10) { errors.message = 'Message should be at least 10 characters.'; ok = false }
  return ok
}

async function onSubmit() {
  success.value = false
  if (!validate()) return
  submitting.value = true
  try {
    await submitContact({ ...form })
    success.value = true
    Object.keys(form).forEach((k) => (form[k] = ''))
  } catch (e) {
    // map Laravel 422 field errors back onto the form
    if (e.errors && Object.keys(e.errors).length) {
      for (const [field, msgs] of Object.entries(e.errors)) {
        if (field in errors) errors[field] = Array.isArray(msgs) ? msgs[0] : String(msgs)
      }
    } else {
      serverError.value = e.message
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="ct">
    <!-- banner -->
    <section class="ct-banner">
      <div class="ct-container">
        <div class="ct-crumb"><a href="/">Home</a> <span>/</span> <span>Contact Us</span></div>
        <h1>Get In Touch</h1>
        <p>Have a project or a question? Send us a message and our team will get back to you.</p>
      </div>
    </section>

    <section class="ct-body">
      <div class="ct-container ct-layout">
        <!-- info column -->
        <aside class="ct-info">
          <h3>Contact Information</h3>
          <p class="ct-info-lead">Reach us directly or use the form — we usually reply within one business day.</p>

          <div class="ct-info-item">
            <span class="ct-ic">◉</span>
            <div><b>Address</b><span>Joydebpur, Gazipur, Bangladesh</span></div>
          </div>
          <div class="ct-info-item">
            <span class="ct-ic">✆</span>
            <div><b>Phone</b><span>+880 1XXX-XXXXXX</span></div>
          </div>
          <div class="ct-info-item">
            <span class="ct-ic">✉</span>
            <div><b>Email</b><span>info@snengineeringworks.com</span></div>
          </div>
          <div class="ct-info-item">
            <span class="ct-ic">◷</span>
            <div><b>Working Hours</b><span>Sat – Thu, 9:00 AM – 6:00 PM</span></div>
          </div>
        </aside>

        <!-- form column -->
        <div class="ct-card">
          <h3>Send us a message</h3>

          <div v-if="success" class="ct-alert ok">
            <span>✓</span>
            <div><b>Message sent!</b> Thanks for reaching out — we'll get back to you shortly.</div>
          </div>
          <div v-if="serverError" class="ct-alert err">
            <span>⚠</span><div>{{ serverError }}</div>
          </div>

          <form @submit.prevent="onSubmit" novalidate>
            <div class="ct-grid-2">
              <div class="ct-field">
                <label>Name <i>*</i></label>
                <input v-model="form.name" class="ct-input" :class="{ err: errors.name }" placeholder="Your full name" />
                <small v-if="errors.name">{{ errors.name }}</small>
              </div>
              <div class="ct-field">
                <label>Email <i>*</i></label>
                <input v-model="form.email" type="email" class="ct-input" :class="{ err: errors.email }" placeholder="you@example.com" />
                <small v-if="errors.email">{{ errors.email }}</small>
              </div>
            </div>

            <div class="ct-grid-2">
              <div class="ct-field">
                <label>Phone</label>
                <input v-model="form.phone" class="ct-input" :class="{ err: errors.phone }" placeholder="+880 1XXX-XXXXXX" />
                <small v-if="errors.phone">{{ errors.phone }}</small>
              </div>
              <div class="ct-field">
                <label>Subject</label>
                <input v-model="form.subject" class="ct-input" :class="{ err: errors.subject }" placeholder="How can we help?" />
                <small v-if="errors.subject">{{ errors.subject }}</small>
              </div>
            </div>

            <div class="ct-field">
              <label>Message <i>*</i></label>
              <textarea v-model="form.message" class="ct-textarea" :class="{ err: errors.message }" placeholder="Tell us about your project or enquiry…"></textarea>
              <small v-if="errors.message">{{ errors.message }}</small>
            </div>

            <button type="submit" class="ct-btn" :disabled="submitting">
              <span v-if="submitting" class="ct-spin"></span>
              <span>{{ submitting ? 'Sending…' : 'Send Message' }}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ct { --blue: var(--blue, #1763c9); }
.ct-container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

.ct-banner { background: linear-gradient(150deg, #12283f 0%, #0d3a73 100%); color: #fff; padding: 54px 0; position: relative; overflow: hidden; }
.ct-banner::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 26px 26px; mask-image: radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 80%);
}
.ct-banner > * { position: relative; }
.ct-crumb { font-size: 13px; color: #a9c0da; margin-bottom: 12px; }
.ct-crumb a { color: #a9c0da; text-decoration: none; }
.ct-crumb span { margin: 0 4px; }
.ct-banner h1 { font-size: 32px; font-weight: 700; margin: 0 0 8px; }
.ct-banner p { color: #bcd0e6; margin: 0; font-size: 15px; max-width: 560px; }

.ct-body { padding: 48px 0 64px; background: #f4f7fb; }
.ct-layout { display: grid; grid-template-columns: 340px 1fr; gap: 28px; align-items: start; }
@media (max-width: 820px){ .ct-layout { grid-template-columns: 1fr; } }

/* info */
.ct-info { background: linear-gradient(160deg, #12283f, #123a6e); color: #fff; border-radius: 16px; padding: 28px 26px; }
.ct-info h3 { margin: 0 0 8px; font-size: 19px; }
.ct-info-lead { color: #b6cae0; font-size: 13.5px; line-height: 1.6; margin: 0 0 22px; }
.ct-info-item { display: flex; gap: 14px; align-items: flex-start; padding: 12px 0; border-top: 1px solid rgba(255,255,255,.1); }
.ct-ic { width: 38px; height: 38px; flex: none; border-radius: 10px; background: rgba(255,255,255,.12); display: grid; place-items: center; font-size: 17px; }
.ct-info-item b { display: block; font-size: 13.5px; }
.ct-info-item span { color: #b6cae0; font-size: 13px; }

/* form card */
.ct-card { background: #fff; border: 1px solid #e2e9f1; border-radius: 16px; padding: 30px; box-shadow: 0 1px 2px rgba(18,40,63,.06); }
.ct-card h3 { margin: 0 0 20px; font-size: 20px; color: #16212e; }

.ct-alert { display: flex; gap: 10px; align-items: flex-start; padding: 12px 14px; border-radius: 10px; font-size: 13.5px; margin-bottom: 18px; line-height: 1.5; }
.ct-alert.ok { background: #e7f6ed; color: #17693b; border: 1px solid #bfe6cd; }
.ct-alert.err { background: #fdeaea; color: #a51c1c; border: 1px solid #f2c9c9; }
.ct-alert span { font-size: 15px; }

.ct-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 520px){ .ct-grid-2 { grid-template-columns: 1fr; } }
.ct-field { margin-bottom: 16px; }
.ct-field label { display: block; font-size: 13px; font-weight: 600; color: #16212e; margin-bottom: 6px; }
.ct-field label i { color: #dc2626; font-style: normal; }
.ct-input, .ct-textarea {
  width: 100%; font: inherit; font-size: 14px; color: #16212e;
  padding: 11px 13px; border: 1px solid #d6e0ec; border-radius: 10px; background: #fff; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.ct-textarea { min-height: 130px; resize: vertical; }
.ct-input:focus, .ct-textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(23,99,201,.13); }
.ct-input.err, .ct-textarea.err { border-color: #dc2626; }
.ct-field small { display: block; color: #dc2626; font-size: 12px; margin-top: 5px; }

.ct-btn {
  display: inline-flex; align-items: center; gap: 9px; justify-content: center;
  background: var(--blue); color: #fff; border: 0; border-radius: 10px;
  padding: 12px 26px; font: inherit; font-weight: 600; font-size: 15px; cursor: pointer;
  transition: background .15s;
}
.ct-btn:hover { background: #1257b0; }
.ct-btn:disabled { opacity: .65; cursor: not-allowed; }
.ct-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.45); border-top-color: #fff; border-radius: 50%; animation: ct-rot .7s linear infinite; }
@keyframes ct-rot { to { transform: rotate(360deg); } }
</style>
