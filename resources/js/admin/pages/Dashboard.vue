<script setup>
const stats = [
  { icon: '⚙', cls: 'b-blue',  num: '8',   lbl: 'Active services' },
  { icon: '▣', cls: 'b-amber', num: '124', lbl: 'Projects listed' },
  { icon: '✉', cls: 'b-green', num: '17',  lbl: 'New enquiries' },
  { icon: '▦', cls: 'b-ink',   num: '46',  lbl: 'Gallery items' },
]

const activity = [
  { who: 'Rafiq H.', what: 'submitted a contact enquiry', when: '12 min ago', tag: 'Enquiry' },
  { who: 'You', what: 'updated “Pipeline Fabrication” service', when: '2 hours ago', tag: 'Service' },
  { who: 'You', what: 'added a new project to Gallery', when: 'Yesterday', tag: 'Gallery' },
  { who: 'Karim I.', what: 'submitted a quote request', when: 'Yesterday', tag: 'Enquiry' },
]
</script>

<template>
  <div>
    <div class="sn-page-head">
      <div>
        <h1>Dashboard</h1>
        <p>Overview of your website content and recent activity.</p>
      </div>
      <router-link to="/admin/services" class="sn-btn sn-btn-primary">Manage services</router-link>
    </div>

    <div class="sn-stat-grid">
      <div v-for="s in stats" :key="s.lbl" class="sn-card sn-stat">
        <div class="badge" :class="s.cls">{{ s.icon }}</div>
        <div>
          <div class="num">{{ s.num }}</div>
          <div class="lbl">{{ s.lbl }}</div>
        </div>
      </div>
    </div>

    <div class="sn-card" style="padding:20px 22px">
      <h3 style="font-family:var(--sn-display);font-size:16px;margin:0 0 4px">Recent activity</h3>
      <p style="font-size:12.5px;color:var(--sn-muted);margin:0 0 14px">Latest changes and enquiries across the site.</p>
      <div>
        <div
          v-for="(a, i) in activity"
          :key="i"
          style="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid var(--sn-border)"
        >
          <div class="sn-avatar" style="width:34px;height:34px;font-size:12px">{{ a.who[0] }}</div>
          <div style="flex:1">
            <div style="font-size:13.5px"><b>{{ a.who }}</b> {{ a.what }}</div>
            <div style="font-size:11.5px;color:var(--sn-muted)">{{ a.when }}</div>
          </div>
          <span class="sn-pill pill-off">{{ a.tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
