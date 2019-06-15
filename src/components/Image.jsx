import * as Vibrant from 'node-vibrant'
import React, { useContext } from 'react'
import { ColorContext } from '../providers/ColorProvider'

export const Image = React.memo(
  ({ album, paused }) => {
    const { setBackgroundColor } = useContext(ColorContext)

    const imageRef = React.createRef()

    if (!album.images) {
      return null
    }

    const image = album.images.find(
      image => image.width === 640 || image.height === 640
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
        width={image.height}
        height={image.width}
        style={{
          // background: 'white',
          // borderRadius: '50%',
          // border: '100px solid black',
          // width: 640,
          // padding: 4,
          maxWidth: '100%',
          borderRadius: 8,
          // boxShadow: '0 2px 5px -4px #777',
          // animation: paused ? 'none' : 'spin 4s linear infinite',
          // backfaceVisibility: 'hidden',
          // perspective: 1000,
          // willChange: 'animation',
        }}
        onLoad={() => {
          const vibrant = new Vibrant(imageRef.current)

          vibrant.getPalette().then(palette => {
            setBackgroundColor(palette.LightVibrant.hex)
          })
        }}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps.album.uri === nextProps.album.uri &&
    prevProps.paused === nextProps.paused
)
