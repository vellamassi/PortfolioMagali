import type { ContentBlock } from '../lib/directus'
import { youtubeEmbedUrl } from '../lib/youtube'

type VideoBlockProps = {
  block: ContentBlock & { type: 'youtube' }
}

export default function VideoBlock({ block }: VideoBlockProps) {
  return (
    <div className="block-video">
      <div className="block-video__video">
        <iframe
          src={youtubeEmbedUrl(block.video_url_1)}
          title="Video 1"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {block.video_url_2 && (
        <div className="block-video__video">
          <iframe
            src={youtubeEmbedUrl(block.video_url_2)}
            title="Video 2"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}