import * as Vibrant from 'node-vibrant'
import React from 'react'

export const Image = React.memo(
  ({ album, paused }) => {
    const imageRef = React.createRef()

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
        ref={imageRef}
        crossOrigin={'anonymous'}
        alt={`${album.name} cover`}
        src={image.url}
        width={300}
        height={300}
        style={{
          background: 'white',
          borderRadius: '50%',
          border: '100px solid black',
          width: 300,
          padding: 4,
          maxWidth: '100%',
          animation: paused ? 'none' : 'spin 4s linear infinite',
          transform: 'translate3d(0, 0, 0)',
        }}
        onLoad={() => {
          const vibrant = new Vibrant(imageRef.current)

          vibrant.getPalette().then(palette => {
            document.body.style.backgroundColor = palette.LightVibrant.hex
          })
        }}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps.album.uri === nextProps.album.uri &&
    prevProps.paused === nextProps.paused
)
