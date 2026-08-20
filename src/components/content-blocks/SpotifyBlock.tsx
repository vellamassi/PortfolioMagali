import SpotifyEmbed from '../Spotify'
import type { SpotifyContent } from '../../lib/directus'

type SpotifyBlockProps = {
  block: SpotifyContent
}

export default function SpotifyBlock({ block }: SpotifyBlockProps) {
  return (
    <div className="spotify">
      <SpotifyEmbed url={block.spotify_url} />
    </div>
  )
}
