import Markdown from 'react-markdown'
import { assetUrl, type Project as ProjectItem } from '../lib/directus'
import Button from './Button'
import SpotifyEmbed from './Spotify'
import SubnavTile from "./SubnavTile.tsx";

type ProjectProps = {
  project: ProjectItem
}

export default function Project({ project }: ProjectProps) {
  return (
      <div className="project">
          <div className="project__content">
              <h2>{project.title}</h2>

              <div className="project__description">
                  <Markdown>{project.description}</Markdown>
              </div>

              {project.button_text && project.url && (
                  <Button href={project.url}>{project.button_text}</Button>
              )}
          </div>

          <div className="project__image">
              <img src={assetUrl(project.image)} alt={project.title} />
          </div>

          {project.spotify_url && (
              <SpotifyEmbed url={project.spotify_url} />
          )}


          {project.related_projects && project.related_projects.length > 0 && (
              <div className="related-projects">
                  <h2>Related Projects</h2>
                  {project.related_projects.map(({ related_projects_id: related }) => (
                      <div key={related.id} className="related-projects__project">
                          <SubnavTile project={related} type={related.type[0]} />
                      </div>
                  ))}
              </div>
          )}
      </div>
  )
}
