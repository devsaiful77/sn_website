export const galleryIcons = ['⚙️', '🔩', '🏭', '🔥', '🛠️', '🚧', '⛓️', '🧰', '🔧', '🛢️', '🚰', '🏗️', '⚡', '📐', '🧱', '🪛']

export const whyReasons = [
  { title: 'Certified Team', text: 'Skilled welders and technicians certified for industrial-grade fabrication work.' },
  { title: 'Safety First', text: 'Strict safety protocols on every site, with zero-compromise on standards.' },
  { title: 'On-Time Delivery', text: 'Projects are planned and tracked to finish within the agreed timeline.' },
  { title: 'Fair Pricing', text: "Transparent quotes with no hidden costs, so you know what you're paying for." },
  { title: 'Modern Equipment', text: 'Well-maintained tools and machinery that keep quality consistent, job after job.' },
  { title: 'After-Service Support', text: 'We stay reachable after handover — for adjustments, questions or maintenance.' }
]

export const testimonials = [
  { initials: 'MK', name: 'Mizanur Karim', role: 'Plant Manager, Textile Mill', text: 'SN Engineering handled our boiler installation end to end — on time, on budget, no shortcuts.' },
  { initials: 'RH', name: 'Rezaul Haque', role: 'Site Engineer, Chemical Plant', text: "Their piping team is precise and fast. We've used them for three projects now, always reliable." },
  { initials: 'SA', name: 'Shirin Akter', role: 'Procurement Head, Reef Retail', text: 'Structural fabrication was delivered ahead of schedule with excellent weld quality throughout.' }
]

export const stats = [
  { icon: '⚙️', count: 10, suffix: '+', label: 'Years of Experience' },
  { icon: '👥', count: 100, suffix: '+', label: 'Happy Clients' },
  { icon: '📦', count: 500, suffix: '+', label: 'Projects Completed' },
  { icon: '🛡️', count: 100, suffix: '%', label: 'Quality Satisfaction' }
]

export const processSteps = [
  { title: 'Site Visit', text: 'We inspect the site and understand the scope before quoting.' },
  { title: 'Quotation', text: 'A clear, itemized quote — no hidden costs, no surprises later.' },
  { title: 'Execution', text: 'Certified technicians execute the work with strict safety protocols.' },
  { title: 'Handover', text: 'Final inspection, testing and sign-off before we call it done.' }
]

// Each slide now has:
//   image   -> file inside public/ (resolved with asset() in the component)
//   overlay -> dark gradient layered OVER the image so white text stays readable
// `bg` is kept as a fallback for browsers/paths where the image is missing.
export const heroSlides = [
  {
    image: 'Contents/images/slider/01-hero-welding.jpg',
    overlay: 'linear-gradient(100deg, rgba(6,16,33,.92) 0%, rgba(10,31,61,.72) 44%, rgba(18,58,107,.30) 100%)',
    bg: 'linear-gradient(120deg,#0a1f3d,#123a6b 55%,#1d4d85)',
    title: 'ENGINEERING',
    accent: 'SOLUTIONS',
    tail: 'THAT BUILD TOMORROW',
    text: 'We provide high quality fabrication, installation & maintenance services for industrial and commercial clients.',
    primaryLabel: '🔍 Our Services',
    primaryTo: '/services',
    sparks: true
  },
  {
    image: 'Contents/images/slider/02-fabrication.jpg',
    overlay: 'linear-gradient(100deg, rgba(5,14,28,.9) 0%, rgba(13,45,80,.68) 46%, rgba(29,77,133,.28) 100%)',
    bg: 'linear-gradient(120deg,#071a33,#1d4d85 60%,#1d63d8)',
    title: 'PRECISION',
    accent: 'FABRICATION',
    tail: 'BUILT TO LAST',
    text: 'From boiler installation to structural steel work, our team delivers on time, every time.',
    primaryLabel: '🏗️ View Projects',
    primaryTo: '/projects',
    sparks: false
  },
  {
    image: 'Contents/images/slider/03-structural.jpg',
    overlay: 'linear-gradient(100deg, rgba(7,20,40,.9) 0%, rgba(11,37,69,.66) 48%, rgba(18,58,107,.26) 100%)',
    bg: 'linear-gradient(120deg,#0b2545,#0a1f3d 50%,#123a6b)',
    title: '10+ YEARS OF',
    accent: 'TRUSTED SERVICE',
    tail: 'IN GAZIPUR',
    text: '100+ happy clients and 500+ completed projects across mechanical and industrial sectors.',
    primaryLabel: '📞 Get A Quote',
    primaryTo: '/contact-us',
    sparks: false
  }
]
