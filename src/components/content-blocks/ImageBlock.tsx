import { assetUrl, type ImageContent } from '../../lib/directus'

type ImageBlockProps = {
  block: ImageContent
}

export default function ImageBlock({ block }: ImageBlockProps) {
  return (
    <div className="block-image">
      <img src={assetUrl(block.image)} alt="" />
    </div>
  )
}
