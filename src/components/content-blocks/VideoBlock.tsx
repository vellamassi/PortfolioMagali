import { youtubeEmbedUrl } from '../../lib/youtube'
import type { YoutubeContent } from '../../lib/directus'

type VideoBlockProps = {
  block: YoutubeContent
}

export default function VideoBlock({ block }: VideoBlockProps) {
  return (
    <div className="video">
      <div className="video__video-frame">
        <iframe
          src={youtubeEmbedUrl(block.video_url_1)}
          title="Video 1"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {block.video_url_2 && (
        <div className="video__video-frame">
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
