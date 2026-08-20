import type { ContentBlock } from '../lib/directus'
import TextBlock from './content-blocks/TextBlock'
import VideoBlock from './content-blocks/VideoBlock'
import SpotifyBlock from './content-blocks/SpotifyBlock'
import ImageBlock from './content-blocks/ImageBlock'
import ImageSliderBlock from "./content-blocks/ImageSliderBlock.tsx";

type ContentBlocksProps = {
  blocks: ContentBlock[]
}

export default function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <div className="content-blocks">
      {blocks.map((block) => {
        switch (block.collection) {
            case 'content_texts':
                return <TextBlock key={block.item.id} block={block.item} />
            case 'content_youtube':
                return <VideoBlock key={block.item.id} block={block.item} />
            case 'content_spotify':
                return <SpotifyBlock key={block.item.id} block={block.item} />
            case 'content_images':
                return <ImageBlock key={block.item.id} block={block.item} />
            case 'content_image_slider':
                return <ImageSliderBlock key={block.item.id} block={block.item} />
        }
      })}
    </div>
  )
}
