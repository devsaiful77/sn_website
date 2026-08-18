<script setup>
import PageBanner from '../components/PageBanner.vue'
import WhyGrid from '../components/WhyGrid.vue'
import StatsBand from '../components/StatsBand.vue'
import CtaBand from '../components/CtaBand.vue'

const values = [
  { title: 'Safety First', text: 'Every job starts with a safety briefing — no shortcuts, no exceptions.' },
  { title: 'Precision', text: 'Measured twice, welded once. Precision is built into our process.' },
  { title: 'Integrity', text: "Honest quotes, honest timelines — we tell you what's really possible." },
  { title: 'Reliability', text: "When we say a job will be done by Thursday, it's done by Thursday." }
]
</script>

<template>
  <div>
  <PageBanner
    crumb="About Us"
    title="About SN Engineering Works"
    text="A decade of building the mechanical and industrial backbone for factories and plants across Gazipur — with safety, precision and on-time delivery at the center of every job."
  />

  <!-- STORY -->
  <section class="section">
    <div class="container-xl">
      <div class="row g-5 align-items-center">
        <div class="col-lg-5" v-reveal="'fade-left'">
          <div class="about-media">
            <div class="photo-block">🏭</div>
            <div class="exp-badge">
              <div class="n">10+</div>
              <div class="l">Years Exp.</div>
            </div>
          </div>
        </div>

        <div class="col-lg-7" v-reveal="'fade-right'">
          <span class="eyebrow">Our Story</span>
          <h2 class="section-title" style="margin-bottom:16px;">Built on the shop floor, not a boardroom.</h2>
          <p class="section-sub" style="margin-top:0;">SN Engineering Works started as a small fabrication workshop serving local factories around Joydebpur. What set us apart from day one was simple: show up, do the job right, and be there when something breaks at 2am.</p>
          <p class="section-sub">Today we're a full-service mechanical and industrial engineering company — handling everything from boiler installation to structural steel work — but we've kept the same hands-on approach that built our first client relationships.</p>

          <ul class="check-list row">
            <li class="col-md-6">Experienced &amp; Skilled Team</li>
            <li class="col-md-6">Modern Tools &amp; Equipment</li>
            <li class="col-md-6">Quality Workmanship</li>
            <li class="col-md-6">Customer Satisfaction Our Priority</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- MISSION / VISION -->
  <section class="section section-soft">
    <div class="container-xl">
      <div class="row g-4">
        <div class="col-md-6" v-reveal>
          <div class="mini-feature-box" style="height:100%;">
            <div class="mini-feature" style="border-top:none; padding-top:0;">
              <div class="mi" style="width:52px; height:52px; font-size:22px;">🎯</div>
              <div>
                <h4 style="font-size:18px; margin-bottom:8px;">Our Mission</h4>
                <p style="font-size:14.5px;">To deliver dependable mechanical and industrial engineering solutions that keep our clients' operations running safely, efficiently and without interruption.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-reveal>
          <div class="mini-feature-box" style="height:100%;">
            <div class="mini-feature" style="border-top:none; padding-top:0;">
              <div class="mi" style="width:52px; height:52px; font-size:22px;">🔭</div>
              <div>
                <h4 style="font-size:18px; margin-bottom:8px;">Our Vision</h4>
                <p style="font-size:14.5px;">To be the most trusted engineering partner for industrial and commercial clients across Bangladesh, known for quality and reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- VALUES -->
  <section class="section">
    <div class="container-xl">
      <div class="section-head" v-reveal>
        <span class="eyebrow">What We Believe</span>
        <h2 class="section-title">Our Core Values</h2>
        <div class="divider-bar"></div>
      </div>

      <WhyGrid :reasons="values" />
    </div>
  </section>

  <StatsBand />

  <CtaBand title="Want To Work With Us?" text="Tell us about your project and get a straightforward quote." />
  </div>
</template>
