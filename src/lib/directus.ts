import { createDirectus, rest, readItems } from '@directus/sdk';

export type Project = {
  id: number;
  title: string;
  button_text: string;
  url: string;
  description: string;
  image: string;
  spotify_url: string;
  type: string[];
};

type Schema = {
  projects: Project[];
};

const directus = createDirectus<Schema>(import.meta.env.VITE_DIRECTUS_URL as string).with(rest());

export function assetUrl(fileId: string): string {
  return `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}`
}

export default directus;
export { readItems };
