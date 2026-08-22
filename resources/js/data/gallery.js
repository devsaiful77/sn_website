// resources/js/data/gallery.js
// Gallery items for the public /gallery page.
// type: 'image' | 'video'
//  - image: needs `src` (full-size) and optional `thumb`
//  - video: needs `src` (mp4/webm) and `poster` (thumbnail shown in the grid)
// Replace these paths with your real files (e.g. /storage/gallery/...).

export const galleryItems = [
  { id: 1, type: 'image', src: '/gallery/pipeline-fab.jpg',   title: 'Pipeline Fabrication',    tag: 'Fabrication' },
  { id: 2, type: 'video', src: '/gallery/site-work.mp4',      poster: '/gallery/site-work.jpg', title: 'On-Site Erection',        tag: 'Field Work', duration: '1:24' },
  { id: 3, type: 'image', src: '/gallery/steel-structure.jpg',title: 'Structural Steel Works',  tag: 'Structural' },
  { id: 4, type: 'image', src: '/gallery/tank-erection.jpg',  title: 'Storage Tank Erection',   tag: 'Erection' },
  { id: 5, type: 'video', src: '/gallery/welding.mp4',        poster: '/gallery/welding.jpg',   title: 'Precision Welding',       tag: 'Fabrication', duration: '0:47' },
  { id: 6, type: 'image', src: '/gallery/machine-align.jpg',  title: 'Machine Alignment',       tag: 'Maintenance' },
  { id: 7, type: 'image', src: '/gallery/piping-run.jpg',     title: 'Industrial Piping',       tag: 'Piping' },
  { id: 8, type: 'image', src: '/gallery/electrical.jpg',     title: 'Electrical Installation', tag: 'Electrical' },
  { id: 9, type: 'video', src: '/gallery/plant-tour.mp4',     poster: '/gallery/plant-tour.jpg',title: 'Plant Walkthrough',       tag: 'Field Work', duration: '2:10' },
]

export default galleryItems
