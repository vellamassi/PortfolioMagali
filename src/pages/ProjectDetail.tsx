import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import directus, { readItems, type Project as ProjectItem } from '../lib/directus'
import Project from '../components/Project'
import { slugify } from '../lib/slug'
import NotFound from './NotFound'

export default function ProjectDetail() {
    const { type, slug } = useParams<{ type: string; slug: string }>()
    const [projects, setProjects] = useState<ProjectItem[]>([])
    const [loaded, setLoaded] = useState(false)

  useEffect(() => {
      directus.request(
          readItems('projects', {
              fields: [
                  '*',
                  'related_projects.related_projects_id.*',
                  {
                      content_blocks:
                          ['collection',
                              {
                                  item: {
                                      content_texts: ['id', 'text'],
                                      content_youtube: ['id', 'video_url_1', 'video_url_2'],
                                      content_spotify: ['id', 'spotify_url'],
                                      content_images: ['id', 'image'],
                                  },
                              },
                          ],
                  },
              ],
          }),
      ).
      then((data) => {
          setProjects(data)
          setLoaded(true)
      })
  }, [])

  const project = projects.find(
      (candidate) => candidate.type.includes(type ?? '') && slugify(candidate.title) === slug,
  )

  if (!loaded) {
      return null
  }

  if (!project) {
      return <NotFound />
  }

  return (
      <section className="page page--project-detail">
          <Project project={project} />
      </section>
  )
}
