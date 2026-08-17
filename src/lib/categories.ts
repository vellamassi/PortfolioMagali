// The Hauptnavi / project categories. Hardcoded because Directus has no
// "categories" collection - each project just carries one or more of these
// values in its `type` tag field. The `type` string must match the Directus
// field's choice values exactly.
export const categories = [
  { type: 'multi_media', label: 'Multi Media' },
  { type: 'srf_socials', label: 'SRF Social Media' },
  { type: 'tv', label: 'TV' },
  { type: 'marketing_communication', label: 'Marketing & Kommunikation' },
  { type: 'texts', label: 'Texte' },
  { type: 'design_animation', label: 'Design und Animation' },
]