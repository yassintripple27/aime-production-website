// Demo inbox: replace with the studio's verified address before accepting inquiries.
export const studioEmail = 'hello@aimeproduction.studio';

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  items: string[];
  groups?: { title: string; items: string[] }[];
};

export const architectureImage = 'https://images.pexels.com/photos/12180202/pexels-photo-12180202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600';
export const architectureDetail = 'https://images.pexels.com/photos/2191622/pexels-photo-2191622.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600';

export const services: Service[] = [
  {
    id: 'brand-identity', number: '01', title: 'Brand Identity',
    description: 'Building recognizable visual identities. Made to stand apart, designed to stay with you.',
    image: '/images/forma-brand.jpg', imageAlt: 'FORMA identity on textured green stationery and architectural print materials',
    items: ['Complete Logo Suite', 'Logo Design', 'Visual Brand Identity', 'Full Brand Guidelines', 'Logo Presentation'],
  },
  {
    id: 'brand-strategy', number: '02', title: 'Brand Strategy',
    description: 'Defining the direction and foundation behind a brand. Clarity before creativity.',
    image: '/images/essen-brand.jpg', imageAlt: 'ESSEN fragrance positioning brought to life through a refined visual direction',
    items: ['Brand Strategy', 'Brand Positioning', 'Brand Direction', 'Brand Communication Strategy'],
  },
  {
    id: 'digital-content', number: '03', title: 'Digital Content',
    description: 'Strategic, engaging content that connects brands with people across digital platforms.',
    image: '/images/off-grid.jpg', imageAlt: 'Orange and black OFF GRID creative campaign visual system',
    items: ['Digital Content Strategy', 'Content Planning', 'Social Media Content', 'Digital Campaigns', 'Digital Advertising', 'Social Media Visual Systems', 'Content Concepts', 'Creative Campaigns'],
  },
  {
    id: 'film-motion', number: '04', title: 'Film & Motion Production',
    description: 'Turning ideas into cinematic stories and moving visual experiences. Every frame, with feeling.',
    image: '/images/still-film.jpg', imageAlt: 'A cinematic figure framed by monumental architecture in warm orange light',
    items: ['Film Direction', 'Film Production', 'Short Films', 'Documentaries', 'Video Advertisements', 'Commercials', 'Promotional Ads', 'Motion Graphics', 'Motion Design'],
  },
  {
    id: 'graphic-design', number: '05', title: 'Graphic Design & Production',
    description: 'Thoughtful visual communication for digital, marketing and physical applications.',
    image: '/images/off-grid.jpg', imageAlt: 'Art-directed OFF GRID printed campaign posters',
    items: ['Social Media Design', 'Marketing Design', 'Flyers', 'Posters', 'Banners', 'Print Design', 'Business Cards', 'ID Cards', 'Design Production'],
  },
  {
    id: 'photography', number: '06', title: 'Photography',
    description: 'Visual stories that capture the character of people, brands, products and places.',
    image: architectureImage, imageAlt: 'Sculptural concrete architecture captured in light and shadow',
    items: ['Brand & Corporate', 'Product', 'Events & Documentary', 'Lifestyle & Editorial', 'Architecture & Real Estate', 'Advertising & Campaigns'],
    groups: [
      { title: 'Brand & Corporate', items: ['Corporate portraits', 'Team photography', 'Executive portraits', 'Workplace photography'] },
      { title: 'Product', items: ['Product photography', 'Advertising photography', 'Lifestyle product photography'] },
      { title: 'Events & Documentary', items: ['Corporate events', 'Conferences', 'Launches', 'Documentary photography'] },
      { title: 'Lifestyle & Editorial', items: ['Lifestyle photography', 'Portrait photography', 'Editorial photography', 'Fashion photography'] },
      { title: 'Architecture & Real Estate', items: ['Architecture', 'Interiors', 'Real estate', 'Construction'] },
      { title: 'Advertising & Campaigns', items: ['Commercial campaigns', 'Brand campaigns', 'Promotional photography', 'Creative advertising'] },
    ],
  },
  {
    id: '2d-3d-art', number: '07', title: '2D / 3D Design & Art',
    description: 'Bringing ideas to life through digital art, models and visualisation. Beyond the expected.',
    image: '/images/other-forms.jpg', imageAlt: 'An organic liquid-chrome sculpture in a warm architectural environment',
    items: ['2D Design', '3D Design', '3D Models', '3D Visualisation', 'Digital Art', 'Creative Art Direction'],
  },
];

export const projectCategories = ['All', 'Brand Identity', 'Brand Strategy', 'Digital Content', 'Film & Motion', 'Graphic Design', 'Photography', '2D / 3D & Art'];

export type GalleryImage = { src: string; alt: string; caption: string; position?: string; detail?: boolean };
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  categories: string[];
  image: string;
  imageAlt: string;
  description: string;
  challenge: string;
  strategy: string;
  direction: string;
  production: string;
  result: string;
  gallery: GalleryImage[];
  credit?: string;
};

export const projects: Project[] = [
  {
    slug: 'forma', title: 'FORMA', subtitle: 'Spaces for living.', client: 'FORMA / Studio concept', year: '2026',
    categories: ['Brand Identity', 'Brand Strategy'], image: '/images/forma-brand.jpg',
    imageAlt: 'Forest-green FORMA architecture book and cream stationery on a concrete surface',
    description: 'An architectural identity built on clarity, balance and a sense of place.',
    challenge: 'How can an architectural practice express its sensitivity to space before someone steps inside a building? FORMA is a self-initiated exploration of an identity that feels as considered as the spaces it represents.',
    strategy: 'We began with one idea: spaces for living. Rather than leaning on architectural complexity, the positioning celebrates the relationship between people, materials and the everyday places they inhabit.',
    direction: 'A confident typographic mark, forest-green palette and warm uncoated textures create a quietly distinctive system. Generous negative space gives the photography room to breathe.',
    production: 'The identity was developed across a complete logo suite, stationery, an editorial publication and environmental signage. Each application explores how the same principles translate from a small printed card to a physical space.',
    result: 'A cohesive concept identity with a clear point of view. An exercise in making every detail, from a wordmark to a wall, feel like part of the same world.',
    gallery: [
      { src: '/images/forma-space.jpg', alt: 'FORMA environmental signage in a minimal travertine reception', caption: 'The identity, made spatial.' },
      { src: '/images/forma-brand.jpg', alt: 'Detail of the FORMA green book and printed identity', caption: 'A tactile identity system.', detail: true, position: '35% 65%' },
      { src: '/images/forma-space.jpg', alt: 'Sunlight across FORMA studio signage and architectural materials', caption: 'Material, light and a sense of place.', detail: true, position: '15% 50%' },
    ],
  },
  {
    slug: 'between-the-light', title: 'BETWEEN THE LIGHT', subtitle: 'A story told in silence.', client: 'AIME / Visual film study', year: '2026',
    categories: ['Film & Motion'], image: '/images/still-film.jpg',
    imageAlt: 'A solitary figure standing between concrete monoliths in a glowing orange desert',
    description: 'A cinematic exploration of stillness, scale and the human presence.',
    challenge: 'Can a story be felt without a single line of dialogue? This self-directed visual film study explores how architecture, a human silhouette and the movement of light can carry an emotional narrative.',
    strategy: 'We stripped the concept back to three elements: a person, a place and a transition. The visual treatment follows a movement from enclosure to openness, allowing the audience to bring their own interpretation.',
    direction: 'Monumental forms, a restrained copper palette and an analogue-inspired grain establish a world between the familiar and the imagined. Wide compositions give the small human figure real emotional weight.',
    production: 'The concept was built through a written treatment, visual storyboarding and cinematic frame development. Light, framing and color were explored together to create a consistent production reference.',
    result: 'An atmospheric visual treatment and series of cinematic concept frames, ready to inform a future motion production. A reminder that the quietest images can tell the most powerful stories.',
    gallery: [
      { src: '/images/still-landscape.jpg', alt: 'A figure walking through a vast amber desert beside monumental architecture', caption: 'Frame 02 / Into the open.' },
      { src: '/images/still-film.jpg', alt: 'Orange light falling between two concrete monoliths', caption: 'Frame 01 / The threshold.', detail: true, position: '55% 45%' },
      { src: '/images/still-landscape.jpg', alt: 'Cinematic detail of the hazy desert landscape', caption: 'A study in light and scale.', detail: true, position: '70% 55%' },
    ],
  },
  {
    slug: 'concrete-quiet', title: 'CONCRETE / QUIET', subtitle: 'Finding feeling in form.', client: 'AIME / Curated visual study', year: '2026',
    categories: ['Photography'], image: architectureImage,
    imageAlt: 'Minimal concrete architecture with a dramatic interplay of light and shadow',
    description: 'An editorial study of architecture, light and the spaces in between.',
    challenge: 'Architecture is often documented as a complete object. This curated visual study asks what happens when the focus shifts to the overlooked: a meeting of surfaces, a quiet shadow, the edge of a form.',
    strategy: 'The editorial approach privileges mood over documentation. Each selected frame isolates a relationship between light and material, inviting a slower, more attentive way of seeing.',
    direction: 'Restrained compositions, strong geometric lines and a nearly monochromatic palette give the collection its coherence. Empty space becomes as important as the structures themselves.',
    production: 'The study brings together licensed reference photography, sequenced as an editorial exploration. It demonstrates a visual direction for future architectural photography rather than claiming commissioned photographic authorship.',
    result: 'A considered editorial reference for architectural storytelling. The sequence reveals how concrete can feel warm, how a shadow can become a subject, and how simplicity can hold attention.',
    credit: 'Reference photography: Francesco Ungaro and David Yu, via Pexels. Presented as a curated direction study, not original AIME photography.',
    gallery: [
      { src: architectureDetail, alt: 'Abstract black and white concrete architecture photographed by David Yu', caption: 'Geometry in monochrome. Photography: David Yu.' },
      { src: architectureImage, alt: 'Close study of light on concrete by Francesco Ungaro', caption: 'The meeting of light and material. Photography: Francesco Ungaro.', detail: true },
      { src: architectureDetail, alt: 'A close-up of minimalist sculptural concrete geometry', caption: 'An architectural detail. Photography: David Yu.', detail: true, position: '65% 35%' },
    ],
  },
  {
    slug: 'off-grid', title: 'OFF GRID', subtitle: 'Culture without a template.', client: 'OFF GRID / Studio concept', year: '2026',
    categories: ['Graphic Design', 'Digital Content'], image: '/images/off-grid.jpg',
    imageAlt: 'Bold orange OFF GRID cultural campaign posters against charcoal concrete',
    description: 'An unapologetic visual system for an independent creative culture.',
    challenge: 'Independent culture needs a voice that does not feel manufactured. OFF GRID is a self-initiated campaign concept that explores how a visual identity can be instantly recognizable while leaving room for experimentation.',
    strategy: 'Build a flexible creative framework, not a rigid template. A small set of bold components allows every piece of content to have its own character without losing the identity of the whole.',
    direction: 'Oversized typography, signal orange and raw black-and-white imagery create an energetic contrast. The grid is a starting point, deliberately interrupted by crops, shifts and unexpected scale.',
    production: 'The graphic language was tested across print posters, digital campaign layouts and social content directions. A modular composition system keeps production consistent while allowing creative freedom.',
    result: 'A distinctive campaign concept that works from the street to the screen. A simple system with enough personality to turn individual pieces into a recognizable cultural presence.',
    gallery: [
      { src: '/images/off-grid.jpg', alt: 'The complete OFF GRID orange and ivory campaign poster system', caption: 'One system. Multiple expressions.' },
      { src: '/images/off-grid.jpg', alt: 'Detail of the bold black typography on the orange poster', caption: 'Typography that takes up space.', detail: true, position: '25% 35%' },
      { src: '/images/off-grid.jpg', alt: 'Ivory poster detail with graphic blocks and architectural photography', caption: 'A framework, not a formula.', detail: true, position: '75% 65%' },
    ],
  },
  {
    slug: 'other-forms', title: 'OTHER FORMS', subtitle: 'Beyond the familiar.', client: 'AIME / 3D art study', year: '2026',
    categories: ['2D / 3D & Art'], image: '/images/other-forms.jpg',
    imageAlt: 'An organic reflective chrome sculpture casting a long shadow on a warm peach surface',
    description: 'An exploration of material, movement and impossible objects.',
    challenge: 'What happens when a familiar material takes an unfamiliar shape? This self-directed art study explores the tension between the industrial precision of metal and the softness of an organic form.',
    strategy: 'Treat a digital object as a physical sculpture. By grounding the unusual form in convincing light, texture and space, the image can feel both impossible and completely tangible.',
    direction: 'Liquid chrome meets warm architectural minimalism. The object reflects a carefully restrained environment, while a single directional light creates a sense of weight and presence.',
    production: 'The concept moved through silhouette studies, material references and lighting exploration. The final visual direction balances a complex reflective surface with an intentionally simple setting.',
    result: 'A sculptural digital art concept that demonstrates how form, surface and environment can work as one. An open-ended visual language for product worlds and creative campaigns.',
    gallery: [
      { src: '/images/other-forms.jpg', alt: 'The complete liquid-chrome sculpture in its architectural environment', caption: 'An impossible object. A tangible presence.' },
      { src: '/images/other-forms.jpg', alt: 'A detail of the sculptural chrome material and warm reflections', caption: 'Surface as a landscape.', detail: true, position: '45% 40%' },
      { src: '/images/other-forms.jpg', alt: 'The shadow and reflective base of the organic chrome sculpture', caption: 'Grounded in light.', detail: true, position: '65% 70%' },
    ],
  },
  {
    slug: 'essen', title: 'ESSEN', subtitle: 'An instinct, bottled.', client: 'ESSEN / Studio concept', year: '2026',
    categories: ['Brand Strategy', 'Brand Identity', 'Digital Content'], image: '/images/essen-brand.jpg',
    imageAlt: 'An ESSEN amber fragrance bottle and burnt orange packaging in warm architectural light',
    description: 'Brand positioning and a sensory world for a modern fragrance concept.',
    challenge: 'In a world of loud luxury, how can a fragrance brand feel personal? ESSEN is a speculative brand exploration built around an intimate, instinctive relationship with scent.',
    strategy: 'We positioned the concept around essential feeling rather than aspirational status. The brand speaks through material, atmosphere and carefully chosen words, letting the product invite rather than insist.',
    direction: 'Clear glass, amber liquid, quiet typography and a warm orange accent create a visual world that feels both modern and tactile. Architectural light gives the simple bottle an unexpected depth.',
    production: 'The concept includes positioning, a verbal direction, visual identity, packaging exploration and a campaign image direction. Every decision returns to the same principle: less noise, more feeling.',
    result: 'An integrated fragrance brand concept with a strong strategic foundation and a coherent sensory presence, from the first encounter with the campaign to the imagined unboxing experience.',
    gallery: [
      { src: '/images/essen-brand.jpg', alt: 'ESSEN fragrance and its orange carton on travertine', caption: 'An essential expression.' },
      { src: '/images/essen-brand.jpg', alt: 'Close-up of the ESSEN label and amber fragrance', caption: 'Identity in the details.', detail: true, position: '35% 60%' },
      { src: '/images/essen-brand.jpg', alt: 'Warm orange fragrance packaging and architectural shadows', caption: 'A sensory brand world.', detail: true, position: '75% 40%' },
    ],
  },
];