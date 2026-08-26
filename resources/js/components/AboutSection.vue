<script setup>
// Home page "About Us" section — matches the reference layout:
// left image · middle heading + checklist · right feature card.
// Drop <AboutSection /> into your Home page.

const points = [
  'Experienced & Skilled Team',
  'Modern Tools & Equipment',
  'Quality Workmanship',
  'Customer Satisfaction Our Priority',
]

const features = [
  { key: 'quality',   title: 'Quality',        text: 'We never compromise with quality.' },
  { key: 'precision', title: 'Precision',      text: 'Precision in every single detail.' },
  { key: 'timely',    title: 'Timely Delivery', text: 'On time completion is our commitment.' },
]

const baseUrl = import.meta.env.VITE_API_BASE_URL
const aboutImage = baseUrl + '/Contents/images/about-industrial-work.jpg'

</script>

<template>
  <section class="section ab-section">
    <div class="container-xl">
      <div class="row g-4 align-items-center">

        <!-- LEFT: image -->
        <div class="col-lg-4" v-reveal="'fade-right'">
          <div class="ab-img">
            <img :src="aboutImage" alt="SN Engineering Works workshop" loading="lazy" />
          </div>
        </div>

        <!-- MIDDLE: text + checklist -->
        <div class="col-lg-5" v-reveal>
          <span class="ab-eyebrow">ABOUT US</span>
          <h2 class="ab-title">SN ENGINEERING WORKS</h2>

          <p class="ab-text">
            SN Engineering Works is a trusted name in the field of mechanical
            fabrication, industrial piping, and maintenance services.
          </p>
          <p class="ab-text">
            We are committed to delivering high quality engineering solutions
            with safety, precision and on-time completion.
          </p>

          <ul class="ab-list">
            <li v-for="p in points" :key="p">
              <span class="ab-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>

        <!-- RIGHT: feature card -->
        <div class="col-lg-3" v-reveal="'fade-left'">
          <div class="ab-card">
            <div v-for="f in features" :key="f.key" class="ab-feature">
              <span class="ab-feature-ic">
                <!-- quality (award) -->
                <svg v-if="f.key === 'quality'" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
                </svg>
                <!-- precision (target) -->
                <svg v-else-if="f.key === 'precision'" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </svg>
                <!-- timely (clock) -->
                <svg v-else viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
              </span>
              <div class="ab-feature-body">
                <b>{{ f.title }}</b>
                <span>{{ f.text }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.ab-section { padding: 64px 0; background: #fff; }
.ab-section .container-xl { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* image */
.ab-img { border-radius: 12px; overflow: hidden; box-shadow: 0 18px 40px -22px rgba(18,40,63,.45); }
.ab-img img { display: block; width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4 / 3.4; }

/* text */
.ab-eyebrow { display: block; color: #1763c9; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; margin-bottom: 8px; }
.ab-title { color: #12283f; font-size: 27px; font-weight: 800; letter-spacing: .4px; margin: 0 0 18px; line-height: 1.2; }
.ab-text { color: #5b6b7b; font-size: 14.5px; line-height: 1.75; margin: 0 0 14px; }

/* checklist */
.ab-list { list-style: none; padding: 0; margin: 20px 0 0; }
.ab-list li { display: flex; align-items: center; gap: 11px; padding: 6px 0; color: #22364a; font-size: 14.5px; }
.ab-check { color: #1763c9; display: inline-flex; flex: none; }

/* feature card */
.ab-card { border: 1.5px solid #cfe0f5; border-radius: 14px; padding: 26px 22px; background: #fff; }
.ab-feature { display: flex; gap: 15px; align-items: flex-start; padding: 16px 0; }
.ab-feature + .ab-feature { border-top: 1px solid #eef3f9; }
.ab-feature:first-child { padding-top: 0; }
.ab-feature:last-child { padding-bottom: 0; }
.ab-feature-ic { color: #12365f; flex: none; margin-top: 2px; }
.ab-feature-body b { display: block; color: #12283f; font-size: 15px; font-weight: 700; margin-bottom: 3px; }
.ab-feature-body span { display: block; color: #6a7787; font-size: 13px; line-height: 1.55; }

@media (max-width: 991px){
  .ab-title { font-size: 24px; }
  .ab-card { margin-top: 8px; }
}
</style>
