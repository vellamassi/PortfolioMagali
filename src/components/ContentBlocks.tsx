import type { ContentBlock } from '../lib/directus'
import TextBlock from './TextBlock'
import VideoBlock from './VideoBlock'

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
        }
      })}
    </div>
  )
}
