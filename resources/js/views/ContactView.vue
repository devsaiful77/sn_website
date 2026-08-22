<script setup>
import { reactive, ref } from 'vue'
import PageBanner from '../components/PageBanner.vue'
import { submitContact } from '../services/contact'

const form = reactive({ name: '', phone: '', email: '', service: 'Mechanical Fabrication', message: '' })
const errors = reactive({ name: '', phone: '', email: '', message: '' })
const submitting = ref(false)
const submitted = ref(false)
const serverError = ref('')

function clearErrors() {
  errors.name = errors.phone = errors.email = errors.message = ''
  serverError.value = ''
}

function validate() {
  clearErrors()
  let ok = true
  if (!form.name.trim()) { errors.name = 'Please enter your name.'; ok = false }
  if (!form.phone.trim()) { errors.phone = 'Phone number is required.'; ok = false }
  else if (!/^[0-9+\-\s()]{6,20}$/.test(form.phone)) { errors.phone = 'Enter a valid phone number.'; ok = false }
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) { errors.email = 'Enter a valid email address.'; ok = false }
  if (!form.message.trim()) { errors.message = 'Please tell us about your project.'; ok = false }
  else if (form.message.trim().length < 10) { errors.message = 'Message should be at least 10 characters.'; ok = false }
  return ok
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  try {
    await submitContact({ ...form })
    submitted.value = true
  } catch (e) {
    if (e.errors && Object.keys(e.errors).length) {
      for (const [field, msgs] of Object.entries(e.errors)) {
        if (field in errors) errors[field] = Array.isArray(msgs) ? msgs[0] : String(msgs)
      }
    } else {
      serverError.value = e.message || 'Something went wrong. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}

const faqs = [
  { q: 'How fast do you reply?', a: 'Within one business day — usually the same day if you message before 5pm.' },
  { q: 'Do you visit the site first?', a: 'For most jobs, yes — a site visit lets us quote accurately before work starts.' },
  { q: 'Do you work outside Gazipur?', a: 'Yes, we take projects across Bangladesh depending on scope and timeline.' },
  { q: 'Is a quote free?', a: 'Yes — every quote is free with no obligation to proceed.' }
]
</script>

<template>
  <div>
  <PageBanner
    crumb="Contact Us"
    title="Get In Touch"
    text="Have a fabrication, piping or maintenance job in mind? Send us the details and we'll get back to you within one business day."
  />

  <!-- CONTACT -->
  <section class="section">
    <div class="container-xl">
      <div class="row g-5">
        <div class="col-lg-7" v-reveal="'fade-left'">
          <div class="contact-form-wrap">
            <h2 style="font-size:20px; margin-bottom:22px;">Send Us A Message</h2>

            <form v-if="!submitted" @submit.prevent="handleSubmit">
              <div v-if="serverError" class="nx-form-alert">{{ serverError }}</div>

              <div class="row">
                <div class="col-md-6">
                  <input v-model="form.name" type="text" class="form-control-nx" :class="{ 'nx-invalid': errors.name }" placeholder="Full Name" />
                  <small v-if="errors.name" class="nx-field-error">{{ errors.name }}</small>
                </div>
                <div class="col-md-6">
                  <input v-model="form.phone" type="tel" class="form-control-nx" :class="{ 'nx-invalid': errors.phone }" placeholder="Phone Number" />
                  <small v-if="errors.phone" class="nx-field-error">{{ errors.phone }}</small>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <input v-model="form.email" type="email" class="form-control-nx" :class="{ 'nx-invalid': errors.email }" placeholder="Email Address" />
                  <small v-if="errors.email" class="nx-field-error">{{ errors.email }}</small>
                </div>
                <div class="col-md-6">
                  <select v-model="form.service" class="form-control-nx">
                    <option>Mechanical Fabrication</option>
                    <option>Industrial Piping</option>
                    <option>Boiler &amp; Steam Line Work</option>
                    <option>Structural Fabrication</option>
                    <option>Maintenance &amp; Repair</option>
                    <option>Pump &amp; Motor Repair</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <textarea v-model="form.message" class="form-control-nx" :class="{ 'nx-invalid': errors.message }" placeholder="Tell us about your project..."></textarea>
              <small v-if="errors.message" class="nx-field-error" style="margin-bottom:14px;">{{ errors.message }}</small>
              <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="submitting">
                {{ submitting ? 'Sending…' : 'Send Message' }}
              </button>
            </form>

            <div v-else style="text-align:center; padding:30px 0;">
              <div style="font-size:40px; margin-bottom:14px;">✅</div>
              <h3 style="font-size:18px; margin-bottom:8px;">Thanks, {{ form.name.split(' ')[0] || 'there' }}!</h3>
              <p class="section-sub" style="margin:0 auto;">We've got your message and will reach out within one business day.</p>
            </div>
          </div>
        </div>

        <div class="col-lg-5" v-reveal="'fade-right'">
          <div class="contact-item">
            <div class="ci-icon">📞</div>
            <div><div class="ci-label">CALL US</div><div class="ci-value">+880 1911-234567</div></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">✉️</div>
            <div><div class="ci-label">EMAIL US</div><div class="ci-value">info@snengineeringworks.com</div></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">📍</div>
            <div><div class="ci-label">OFFICE</div><div class="ci-value">J-86, Kabir Shopping Tower, Joydebpur, Gazipur</div></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">🕐</div>
            <div><div class="ci-label">WORKING HOURS</div><div class="ci-value">Sat–Thu, 9am–7pm</div></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">💬</div>
            <div><div class="ci-label">WHATSAPP</div><div class="ci-value"><a href="https://wa.me/8801911234567">Chat with us instantly</a></div></div>
          </div>

          <div class="map-block">Office location map</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section section-soft">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">Quick Answers</span>
        <h2 class="section-title">Before You Write In</h2>
        <div class="divider-bar"></div>
      </div>

      <div class="row g-4" v-reveal>
        <div v-for="f in faqs" :key="f.q" class="col-md-6 col-lg-3">
          <div class="why-card">
            <div class="why-num">?</div>
            <h3>{{ f.q }}</h3>
            <p>{{ f.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
/* Only styles the new validation elements — your existing design is untouched. */
.nx-field-error { display: block; color: #dc2626; font-size: 12.5px; margin-top: -6px; margin-bottom: 12px; }
.form-control-nx.nx-invalid { border-color: #dc2626 !important; }
.nx-form-alert { background: #fdeaea; color: #a51c1c; border: 1px solid #f2c9c9; padding: 11px 14px; border-radius: 8px; font-size: 13.5px; margin-bottom: 18px; }
.btn[disabled] { opacity: .65; cursor: not-allowed; }
</style>
