import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import directus, { readItems, type Project as ProjectItem } from '../lib/directus'
import { categories } from '../lib/categories'
import SubnavTile from '../components/SubnavTile'
import NotFound from './NotFound'

export default function ProjectCategory() {
    const { type } = useParams<{ type: string }>()
    const [projects, setProjects] = useState<ProjectItem[]>([])
    const category = categories.find((candidate) => candidate.type === type)

    useEffect(() => {
        directus.request(readItems('projects')).then(setProjects)
    }, [])

    if (!category) {
        return <NotFound />
    }

    const filtered = projects.filter((project) => project.type.includes(type ?? ''))

    return (
        <section className="page page--project-category">
            <h1>{category.label}</h1>
            <ul className="subnav__tiles">
                {filtered.map((project) => (
                  <li key={project.id} className="subnav__tile-slot">
                    <SubnavTile project={project} type={type ?? ''} />
                  </li>
                ))}
            </ul>
        </section>
    )
}
