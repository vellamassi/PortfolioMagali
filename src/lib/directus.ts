import { createDirectus, rest, readItems } from '@directus/sdk';

type ProjectFields = {
  id: number;
  title: string;
  button_text: string;
  url: string;
  text: string;
  image: string;
  type: string[];
};

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'youtube'; video_url_1: string; video_url_2: string | null }
  | { type: 'spotify'; spotify_url: string };

export type Project = ProjectFields & {
  related_projects?: { related_projects_id: ProjectFields }[];
  content_blocks?: ContentBlock[] | null;
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
