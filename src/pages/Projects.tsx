import { useEffect, useState } from 'react'
import directus, { readItems, type Project as ProjectItem } from '../lib/directus'
import Project from '../components/Project'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([])

  useEffect(() => {
    directus.request(readItems('projects')).then(setProjects)
  }, [])

  return (
    <section className="page page--projects">
      <h1>Projects</h1>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </section>
  )
}
