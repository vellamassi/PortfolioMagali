import { useEffect, useRef } from 'react'

// intervall between glitches and how long the glitches last
const INTERVAL_MS = 10_000
const MIN_DURATION_MS = 150
const MAX_DURATION_MS = 300

export default function GlitchEffect() {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            return
        }

        let timeoutId: number | undefined

        const fire = () => {
            const target = document.querySelector<HTMLElement>('.main')
            const overlay = overlayRef.current
            const duration = MIN_DURATION_MS + Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS)
            const durationValue = `${duration}ms`

            target?.style.setProperty('--glitch-duration', durationValue)
            overlay?.style.setProperty('--glitch-duration', durationValue)

            target?.classList.add('glitch-target')
            overlay?.classList.add('is-active')

            timeoutId = window.setTimeout(() => {
                target?.classList.remove('glitch-target')
                overlay?.classList.remove('is-active')
            }, duration)
        }

        const intervalId = window.setInterval(fire, INTERVAL_MS)

        return () => {
            window.clearInterval(intervalId)
            window.clearTimeout(timeoutId)
        }
    }, [])

    return <div ref={overlayRef} className="glitch-overlay" aria-hidden="true" />
}
