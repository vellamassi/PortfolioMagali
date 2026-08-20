import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { assetUrl, type ImageSliderContent } from '../../lib/directus'

type ImageSliderBlockProps = {
  block: ImageSliderContent
}

export default function ImageSliderBlock({ block }: ImageSliderBlockProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const images = block.images.map(({ content_images_id }) => content_images_id)

  return (
    <div className="image-slider">
      <div className="image-slider__viewport" ref={emblaRef}>
        <div className="image-slider__container">
          {images.map((image) => (
            <div className="image-slider__slide" key={image.id}>
              <img src={assetUrl(image.image)} alt="" />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="image-slider__button block-image-slider__button--prev"
            onClick={scrollPrev}
            aria-label="Previous image"
          ></button>
          <button
            type="button"
            className="block-image-slider__button block-image-slider__button--next"
            onClick={scrollNext}
            aria-label="Next image">
          </button>
        </>
      )}
    </div>
  )
}
