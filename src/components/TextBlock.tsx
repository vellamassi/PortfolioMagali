import Markdown from 'react-markdown'
import type { ContentBlock } from '../lib/directus'

type TextBlockProps = {
  block: ContentBlock & { type: 'text' }
}

export default function TextBlock({ block }: TextBlockProps) {
  return (
    <div className="block-text">
      <Markdown>{block.text}</Markdown>
    </div>
  )
}