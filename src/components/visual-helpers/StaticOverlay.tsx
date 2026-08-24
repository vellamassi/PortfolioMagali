export default function StaticOverlay() {
    return (<div className="static-overlay" aria-hidden="true">
            <svg className="static-overlay__filters" aria-hidden="true" focusable="false">
                <filter id="static-grain-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>
            <div className="static-overlay__grain"></div>
            <div className="static-overlay__scanlines"></div>
            <div className="static-overlay__vignette"></div>
        </div>
    )
}
