import Markdown from 'react-markdown'
import type { Project as ProjectItem } from '../lib/directus'
import Button from './Button'
import SpotifyEmbed from './Spotify'

type ProjectProps = {
  project: ProjectItem
}

export default function Project({ project }: ProjectProps) {
  return (
      <div className="project">
          <div className="project__content">
              <h2>{project.title}</h2>
              <h3>{project.date}</h3>

              <div className="project__description">
                  <Markdown>{project.description}</Markdown>
              </div>

              {project.button_text && project.url && (
                  <Button href={project.url}>{project.button_text}</Button>
              )}
          </div>

          {project.image && (
              <div className="project__image">
                  <img src={project.image} alt={project.title} />
              </div>
          )}

          {project.spotify_url && (
              <SpotifyEmbed url={project.spotify_url} />
          )}
      </div>
  )
}
