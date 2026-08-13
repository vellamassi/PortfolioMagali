import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export default function Navigation() {
  return (
    <nav className="dvd-nav">
      <ul className="dvd-nav__buttons">
        {links.map(({ to, label, end }) => (
          <li key={to} className="dvd-nav__button-slot">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                ['dvd-nav__button', isActive ? 'dvd-nav__button--active' : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
