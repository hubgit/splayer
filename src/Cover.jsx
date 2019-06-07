import React from 'react'

export const Cover = React.memo(
  ({ album }) => {
    if (!album.images) {
      return null
    }

    const image = album.images.find(
      image => image.width === 300 || image.height === 300
    )

    if (!image) {
      return null
    }

    return (
      <img
        crossOrigin={'anonymous'}
        alt={`${album.name} cover`}
        src={image.url}
        width={image.width}
        height={image.height}
      />
    )
  },
  (prevProps, nextProps) => prevProps.album.uri === nextProps.album.uri
)
