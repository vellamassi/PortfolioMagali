import Markdown from 'react-markdown'
import type { TextContent } from '../../lib/directus'

type TextBlockProps = {
  block: TextContent
}

export default function TextBlock({ block }: TextBlockProps) {
  return (
    <div className="block-text">
      <Markdown>{block.text}</Markdown>
    </div>
  )
}
