import { createDirectus, rest, readItems } from '@directus/sdk';

type ProjectFields = {
  id: number;
  title: string;
  button_text: string;
  url: string;
  image: string;
  type: string[];
};

export type TextContent = { id: number; text: string };
export type YoutubeContent = { id: number; video_url_1: string; video_url_2: string | null };
export type SpotifyContent = { id: number; spotify_url: string };
export type ImageContent = { id: number; image: string };
export type ImageSliderContent = { id: number;  images: { content_images_id: ImageContent }[] };

export type ContentBlock =
  | { collection: 'content_texts'; item: TextContent }
  | { collection: 'content_youtube'; item: YoutubeContent }
  | { collection: 'content_spotify'; item: SpotifyContent }
  | { collection: 'content_images'; item: ImageContent }
  | { collection: 'content_image_slider'; item: ImageSliderContent };

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
