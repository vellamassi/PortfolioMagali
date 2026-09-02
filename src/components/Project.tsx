import { assetUrl, type Project as ProjectItem } from '../lib/directus'
import Button from './Button'
import SubnavTile from "./SubnavTile.tsx";
import ContentBlocks from './ContentBlocks'

type ProjectProps = {
  project: ProjectItem
}

export default function Project({ project }: ProjectProps) {
  return (
      <div className="project">
          <div className="project__content">
              <h2>{project.title}</h2>

              <div className="project__image">
                  <img src={assetUrl(project.image)} alt={project.title} />
              </div>

              {project.content_blocks && project.content_blocks.length > 0 && (
                  <ContentBlocks blocks={project.content_blocks} />
              )}

              {project.button_text && project.url && (
                  <Button href={project.url}>{project.button_text}</Button>
              )}
          </div>

          {project.related_projects && project.related_projects.length > 0 && (
              <div className="related-projects">
                  <h2>Related Projects</h2>
                  {project.related_projects
                      .filter(({ related_projects_id: related }) => related != null)
                      .map(({ related_projects_id: related }) => (
                      <div key={related.id} className="related-projects__related-project">
                          <SubnavTile project={related} type={related.type[0]} />
                      </div>
                  ))}
              </div>
          )}
      </div>
  )
}
