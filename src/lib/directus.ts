import { createDirectus, rest, readItems } from '@directus/sdk';

export type Project = {
  id: string;
  title: string;
  button_text: string;
  url: string;
  description: string;
  image: string | null;
  date: string;
};

type Schema = {
  projects: Project[];
};

const directus = createDirectus<Schema>(import.meta.env.VITE_DIRECTUS_URL as string).with(rest());

export default directus;
export { readItems };
