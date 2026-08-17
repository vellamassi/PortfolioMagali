import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import directus, { readItems, type Project as ProjectItem } from '../lib/directus'
import Project from '../components/Project'
import { slugify } from '../lib/slug'

export default function ProjectDetail() {
  const { type, slug } = useParams<{ type: string; slug: string }>()
  const [projects, setProjects] = useState<ProjectItem[]>([])

  useEffect(() => {
    directus.request(readItems('projects')).then(setProjects)
  }, [])

  const project = projects.find(
    (candidate) => candidate.type.includes(type ?? '') && slugify(candidate.title) === slug,
  )

  if (!project) {
      return
  }

  return (
    <section className="page page--project-detail">
      <Project project={project} />
    </section>
  )
}
