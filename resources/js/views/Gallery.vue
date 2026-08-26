<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { galleryItems } from '../data/gallery'

// ---- filtering ----
const filter = ref('all') // 'all' | 'image' | 'video'
const filters = [
  { key: 'all', label: 'All' },
  { key: 'image', label: 'Photos' },
  { key: 'video', label: 'Videos' },
]
const items = computed(() =>
  filter.value === 'all' ? galleryItems : galleryItems.filter((i) => i.type === filter.value)
)

// ---- YouTube helpers ----
function youtubeId(url) {
  if (!url) return null
  // Improved regex to safely extract 11-char YouTube ID ignoring query params like ?si=
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}
function isYoutube(item) {
  return item?.type === 'video' && !!youtubeId(item.src)
}
function youtubeEmbed(url) {
  const id = youtubeId(url)
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null
}
function youtubeThumb(url) {
  const id = youtubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}
function tilePoster(item) {
  if (item.type === 'video') return item.poster || youtubeThumb(item.src)
  return item.thumb || item.src
}
function onTileImgError(e, item) {
  const t = youtubeThumb(item.src)
  if (item.type === 'video' && t && e.target.src !== t) e.target.src = t
}

// ---- lightbox ----
const index = ref(-1)             // -1 = closed
const current = computed(() => (index.value > -1 ? items.value[index.value] : null))
const videoEl = ref(null)
const frameEl = ref(null)

function open(i) {
  index.value = i
  document.body.style.overflow = 'hidden'
}
function close() {
  pauseVideo()
  index.value = -1
  document.body.style.overflow = ''
}
function next() {
  pauseVideo()
  index.value = (index.value + 1) % items.value.length
}
function prev() {
  pauseVideo()
  index.value = (index.value - 1 + items.value.length) % items.value.length
}
function pauseVideo() {
  if (videoEl.value) { videoEl.value.pause(); videoEl.value.currentTime = 0 }
}

// ---- fullscreen ----
function goFullscreen() {
  const el = frameEl.value || videoEl.value
  if (!el) return
  if (el.requestFullscreen) el.requestFullscreen()
  else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen() 
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  if (videoEl.value) videoEl.value.play?.()
}

// ---- keyboard ----
function onKey(e) {
  if (index.value === -1) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<template>
  <div class="gal">
    <!-- banner -->
    <section class="gal-banner">
      <div class="gal-container">
        <div class="gal-crumb"><a href="/">Home</a> <span>/</span> <span>Gallery</span></div>
        <h1>Our Work Gallery</h1>
        <p>A look at our fabrication, erection and maintenance projects on and off site.</p>
      </div>
    </section>

    <section class="gal-body">
      <div class="gal-container">
        <!-- filters -->
        <div class="gal-filters">
          <button
            v-for="f in filters"
            :key="f.key"
            class="gal-filter"
            :class="{ active: filter === f.key }"
            @click="filter = f.key"
          >{{ f.label }}</button>
        </div>

        <!-- grid -->
        <div class="gal-grid">
          <button
            v-for="(item, i) in items"
            :key="item.id"
            class="gal-tile"
            :class="{ 'is-video': item.type === 'video' }"
            @click="open(i)"
          >
            <img
              :src="tilePoster(item)"
              :alt="item.title"
              loading="lazy"
              @error="onTileImgError($event, item)"
            />
            <span class="gal-tile-overlay">
              <span v-if="item.type === 'video'" class="gal-play">▶</span>
              <span v-else class="gal-zoom">⤢</span>
            </span>
            <span class="gal-tile-meta">
              <b>{{ item.title }}</b>
              <em>{{ item.tag }}</em>
            </span>
            <span v-if="item.type === 'video'" class="gal-badge">▶ {{ item.duration }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- lightbox -->
    <transition name="gal-fade">
      <div v-if="current" class="gal-lb" @click.self="close">
        <button class="gal-lb-close" aria-label="Close" @click="close">×</button>
        <button class="gal-lb-nav prev" aria-label="Previous" @click.stop="prev">‹</button>
        <button class="gal-lb-nav next" aria-label="Next" @click.stop="next">›</button>

        <div class="gal-lb-stage" @click.stop>
          <!-- image -->
          <img v-if="current.type === 'image'" :src="current.src" :alt="current.title" class="gal-lb-media" />

          <!-- video -->
          <div v-else class="gal-lb-video">
            <!-- YouTube -> iframe embed -->
            <iframe
              v-if="isYoutube(current)"
              ref="frameEl"
              :src="youtubeEmbed(current.src)"
              class="gal-lb-media gal-lb-frame"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <!-- self-hosted mp4 -> native video -->
            <video
              v-else
              ref="videoEl"
              :src="current.src"
              :poster="current.poster"
              class="gal-lb-media"
              controls
              playsinline
              preload="metadata"
            ></video>

            <button class="gal-fs-btn" @click="goFullscreen">⛶ Fullscreen</button>
          </div>

          <div class="gal-lb-caption">
            <div>
              <b>{{ current.title }}</b>
              <span>{{ current.tag }}</span>
            </div>
            <span class="gal-counter">{{ index + 1 }} / {{ items.length }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.gal { --blue: var(--blue, #1763c9); --ink: #12283f; }
.gal-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

/* banner */
.gal-banner {
  background: linear-gradient(150deg, #12283f 0%, #0d3a73 100%);
  color: #fff; padding: 54px 0;
  position: relative; overflow: hidden;
}
.gal-banner::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 80%);
}
.gal-banner > * { position: relative; }
.gal-crumb { font-size: 13px; color: #a9c0da; margin-bottom: 12px; }
.gal-crumb a { color: #a9c0da; text-decoration: none; }
.gal-crumb span { margin: 0 4px; }
.gal-banner h1 { font-size: 32px; font-weight: 700; margin: 0 0 8px; letter-spacing: .3px; }
.gal-banner p { color: #bcd0e6; margin: 0; font-size: 15px; max-width: 560px; }

/* body */
.gal-body { padding: 40px 0 64px; background: #f4f7fb; }

/* filters */
.gal-filters { display: flex; gap: 8px; justify-content: center; margin-bottom: 28px; flex-wrap: wrap; }
.gal-filter {
  border: 1px solid #d6e0ec; background: #fff; color: #3d5064;
  padding: 8px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all .15s;
}
.gal-filter:hover { border-color: var(--blue); color: var(--blue); }
.gal-filter.active { background: var(--blue); border-color: var(--blue); color: #fff; }

/* grid */
.gal-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
}
@media (max-width: 860px){ .gal-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px){ .gal-grid { grid-template-columns: 1fr; } }

.gal-tile {
  position: relative; display: block; padding: 0; border: 0; cursor: pointer;
  border-radius: 14px; overflow: hidden; background: #dfe7f0; aspect-ratio: 4 / 3;
  box-shadow: 0 1px 2px rgba(18,40,63,.08); transition: transform .2s, box-shadow .2s;
}
.gal-tile:hover { transform: translateY(-3px); box-shadow: 0 14px 30px -14px rgba(18,40,63,.5); }
.gal-tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s; }
.gal-tile:hover img { transform: scale(1.06); }

.gal-tile-overlay {
  position: absolute; inset: 0; display: grid; place-items: center;
  background: linear-gradient(180deg, rgba(13,40,73,0) 40%, rgba(13,40,73,.35) 100%);
  opacity: 0; transition: opacity .2s;
}
.gal-tile:hover .gal-tile-overlay { opacity: 1; }
.gal-play, .gal-zoom {
  width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center;
  background: rgba(255,255,255,.92); color: var(--blue); font-size: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,.3);
}
.gal-play { padding-left: 4px; }
.gal-tile.is-video .gal-tile-overlay { opacity: 1; background: linear-gradient(180deg, rgba(13,40,73,.15), rgba(13,40,73,.45)); }

.gal-tile-meta {
  position: absolute; left: 0; right: 0; bottom: 0; padding: 14px 16px;
  text-align: left; color: #fff;
  background: linear-gradient(180deg, transparent, rgba(9,24,41,.82));
  transform: translateY(6px); opacity: 0; transition: all .2s;
}
.gal-tile:hover .gal-tile-meta, .gal-tile.is-video .gal-tile-meta { transform: none; opacity: 1; }
.gal-tile-meta b { display: block; font-size: 14.5px; }
.gal-tile-meta em { font-style: normal; font-size: 12px; color: #b9cde3; }

.gal-badge {
  position: absolute; top: 12px; right: 12px;
  background: rgba(9,24,41,.78); color: #fff; font-size: 11.5px; font-weight: 600;
  padding: 4px 9px; border-radius: 6px; letter-spacing: .3px;
}

/* lightbox */
.gal-lb {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(7,16,28,.92); backdrop-filter: blur(3px);
  display: grid; place-items: center; padding: 4vh 4vw;
}
.gal-lb-stage { max-width: 1000px; width: 100%; }
.gal-lb-media {
  display: block; width: 100%; max-height: 78vh; object-fit: contain;
  border-radius: 10px; background: #000;
}
.gal-lb-video { position: relative; width: 100%; }
.gal-lb-frame { width: 100%; aspect-ratio: 16 / 9; height: auto; max-height: 78vh; border: 0; }
.gal-fs-btn {
  position: absolute; top: 12px; right: 12px;
  background: rgba(9,24,41,.72); color: #fff; border: 1px solid rgba(255,255,255,.25);
  padding: 7px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer;
}
.gal-fs-btn:hover { background: var(--blue); border-color: var(--blue); }

.gal-lb-caption {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  margin-top: 14px; color: #fff;
}
.gal-lb-caption b { font-size: 16px; }
.gal-lb-caption span { color: #a9c0da; font-size: 13px; margin-left: 8px; }
.gal-counter { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; color: #8fa8c4; }

.gal-lb-close {
  position: absolute; top: 20px; right: 24px; z-index: 2;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  color: #fff; font-size: 24px; cursor: pointer; line-height: 1;
}
.gal-lb-close:hover { background: rgba(255,255,255,.2); }
.gal-lb-nav {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  color: #fff; font-size: 30px; cursor: pointer; line-height: 1;
}
.gal-lb-nav:hover { background: var(--blue); border-color: var(--blue); }
.gal-lb-nav.prev { left: 3vw; }
.gal-lb-nav.next { right: 3vw; }
@media (max-width: 640px){
  .gal-lb-nav.prev { left: 8px; } .gal-lb-nav.next { right: 8px; }
  .gal-lb-nav { width: 44px; height: 44px; font-size: 24px; }
}

/* transition */
.gal-fade-enter-active, .gal-fade-leave-active { transition: opacity .2s ease; }
.gal-fade-enter-from, .gal-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce){ * { transition: none !important; } }
</style>