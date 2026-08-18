<script setup>
import { ref } from 'vue'
import PageBanner from '../components/PageBanner.vue'

const form = ref({ name: '', phone: '', email: '', service: 'Mechanical Fabrication', message: '' })
const submitted = ref(false)

function handleSubmit() {
  // Hook this up to your backend / form service of choice.
  submitted.value = true
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
              <div class="row">
                <div class="col-md-6">
                  <input v-model="form.name" type="text" class="form-control-nx" placeholder="Full Name" required />
                </div>
                <div class="col-md-6">
                  <input v-model="form.phone" type="tel" class="form-control-nx" placeholder="Phone Number" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <input v-model="form.email" type="email" class="form-control-nx" placeholder="Email Address" />
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
              <textarea v-model="form.message" class="form-control-nx" placeholder="Tell us about your project..." required></textarea>
              <button type="submit" class="btn btn-primary" style="width:100%;">Send Message</button>
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
