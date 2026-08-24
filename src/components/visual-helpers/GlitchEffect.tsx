import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// how long a page-transition glitch burst lasts
const MIN_DURATION_MS = 150
const MAX_DURATION_MS = 300

export default function GlitchEffect() {
    const overlayRef = useRef<HTMLDivElement>(null)
    const previousPathname = useRef<string | null>(null)
    const { pathname } = useLocation()

    useEffect(() => {
        const isRouteChange = previousPathname.current !== null && previousPathname.current !== pathname
        previousPathname.current = pathname

        if (!isRouteChange) {
            return
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            return
        }

        const target = document.querySelector<HTMLElement>('.main')
        const overlay = overlayRef.current
        const duration = MIN_DURATION_MS + Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS)
        const durationValue = `${duration}ms`

        target?.style.setProperty('--glitch-duration', durationValue)
        overlay?.style.setProperty('--glitch-duration', durationValue)

        target?.classList.add('glitch-target')
        overlay?.classList.add('is-active')

        const timeoutId = window.setTimeout(() => {
            target?.classList.remove('glitch-target')
            overlay?.classList.remove('is-active')
        }, duration)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [pathname])

    return <div ref={overlayRef} className="glitch-overlay" aria-hidden="true" />
}
