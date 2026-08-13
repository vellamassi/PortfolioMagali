import { createDirectus, rest, readItems } from '@directus/sdk';

const directus = createDirectus(import.meta.env.VITE_DIRECTUS_URL as string).with(rest());

export default directus;
export { readItems };
