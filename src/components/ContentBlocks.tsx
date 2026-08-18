import type { ContentBlock } from '../lib/directus'
import TextBlock from './content-blocks/TextBlock'
import VideoBlock from './content-blocks/VideoBlock'
import SpotifyBlock from './content-blocks/SpotifyBlock'

type ContentBlocksProps = {
  blocks: ContentBlock[]
}

export default function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <div className="content-blocks">

      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={index} block={block} />
          case 'youtube':
            return <VideoBlock key={index} block={block} />
          case 'spotify':
            return <SpotifyBlock key={index} block={block} />
        }
      })}
    </div>
  )
}
