import type { ReactNode } from 'react'

type ButtonProps = {
  href: string
  children: ReactNode
}

export default function Button({ href, children }: ButtonProps) {
  return (
    <a href={href} className="button" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}