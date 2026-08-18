import type { ContentBlock } from '../../lib/directus'
import SpotifyEmbed from '../Spotify'

type SpotifyBlockProps = {
  block: ContentBlock & { type: 'spotify' }
}

export default function SpotifyBlock({ block }: SpotifyBlockProps) {
  return (
    <div className="block-spotify">
      <SpotifyEmbed url={block.spotify_url} />
    </div>
  )
}