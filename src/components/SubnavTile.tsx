import { NavLink } from 'react-router-dom'
import { assetUrl, type Project as ProjectItem } from '../lib/directus'
import { slugify } from '../lib/slug'

type SubnavTileProps = {
    project: ProjectItem
    type: string
}

export default function SubnavTile({ project, type }: SubnavTileProps) {
    const { image, title } = project

    return (
        <NavLink
            to={`/${type}/${slugify(title)}`}
            className={({ isActive }) =>
                ['subnav-tile', isActive ? 'subnav-tile--active' : '']
                    .filter(Boolean)
                    .join(' ')
            }
        >
            <img src={assetUrl(image)} alt={title} />
            <span className="subnav-tile__title">{title}</span>
        </NavLink>
    )
}