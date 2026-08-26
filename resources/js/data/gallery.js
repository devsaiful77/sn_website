const base_url = 'http://localhost:8000/Contents/images';

export const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: `${base_url}/gallery/1.jpg`,
    title: 'Pipeline Fabrication',
    tag: 'Fabrication',
  },
  {
    id: 2,
    type: 'video',
    src: `https://www.youtube.com/embed/Flh_I7tVf7k?si=HbKhapun10w4Gr-i`,
    poster: `${base_url}/gallery/2.jpg`,
    title: 'On-Site Erection',
    tag: 'Field Work',
    duration: '1:24',
  },
  {
    id: 3,
    type: 'image',
    src: `${base_url}/gallery/3.jpg`,
    title: 'Structural Steel Works',
    tag: 'Structural',
  },
  {
    id: 4,
    type: 'image',
    src: `${base_url}/gallery/4.jpg`,
    title: 'Storage Tank Erection',
    tag: 'Erection',
  },
  {
    id: 5,
    type: 'video',
    src: `https://www.youtube.com/embed/Flh_I7tVf7k?si=HbKhapun10w4Gr-i`,
    poster: `${base_url}/gallery/5.jpg`,
    title: 'Precision Welding',
    tag: 'Fabrication',
    duration: '0:47',
  },
  {
    id: 6,
    type: 'image',
    src: `${base_url}/gallery/6.jpg`,
    title: 'Machine Alignment',
    tag: 'Maintenance',
  },
  {
    id: 7,
    type: 'image',
    src: `${base_url}/gallery/7.jpg`,
    title: 'Industrial Piping',
    tag: 'Piping',
  },
  {
    id: 8,
    type: 'image',
    src: `${base_url}/gallery/8.jpg`,
    title: 'Electrical Installation',
    tag: 'Electrical',
  },
  {
    id: 9,
    type: 'video',
    src: `https://www.youtube.com/embed/Flh_I7tVf7k?si=HbKhapun10w4Gr-i`,
    poster: `${base_url}/gallery/9.jpg`,
    title: 'Plant Walkthrough',
    tag: 'Field Work',
    duration: '2:10',
  },
];

export default galleryItems
