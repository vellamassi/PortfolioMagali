import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import directus, { readItems, type Project as ProjectItem } from '../lib/directus'
import { categories } from '../lib/categories'
import { slugify } from '../lib/slug'

export default function ProjectCategory() {
    const { type } = useParams<{ type: string }>()
    const [projects, setProjects] = useState<ProjectItem[]>([])
    const label = categories.find((category) => category.type === type)?.label ?? type

    useEffect(() => {
        directus.request(readItems('projects')).then(setProjects)
    }, [])

    const filtered = type ? projects.filter((project) => project.type.includes(type)) : []

    return (
        <section className="page page--project-category">
            <h1>{label}</h1>
            <ul className="subnav__tiles">
                {filtered.map((project) => (
                  <li key={project.id} className="subnav__tile-slot">
                    <NavLink
                      to={`/${type}/${slugify(project.title)}`}
                      className={({ isActive }) =>
                        ['subnav__tile', isActive ? 'subnav__tile--active' : '']
                          .filter(Boolean)
                          .join(' ')
                      }
                    >
                      {project.title}
                    </NavLink>
                  </li>
                ))}
            </ul>
        </section>
    )
}
