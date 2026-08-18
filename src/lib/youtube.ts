export function youtubeEmbedUrl(url: string): string {
  const watchId = url.match(/[?&]v=([^&]+)/)?.[1]
  const shortUrlId = url.match(/youtu\.be\/([^?&]+)/)?.[1]
  const shortsId = url.match(/youtube\.com\/shorts\/([^?&]+)/)?.[1]
  const id = watchId ?? shortUrlId ?? shortsId

  return id ? `https://www.youtube.com/embed/${id}` : url
}
