import * as Vibrant from 'node-vibrant'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { ColorContext } from '../providers/ColorProvider'

export const CoverImage = React.memo(
  ({ album }) => {
    const { setBackgroundColor } = useContext(ColorContext)

    const imageRef = React.createRef()

    if (!album.images) {
      return null
    }

    const image = album.images.find(
      image => image.width === 640 || image.height === 640
    )

    const detectColor = useCallback(() => {
      const vibrant = new Vibrant(imageRef.current)

      vibrant.getPalette().then(palette => {
        setBackgroundColor(palette.LightVibrant.hex)
      })
    }, [imageRef, setBackgroundColor])

    if (!image) {
      return null
    }

    return (
      <Image
        ref={imageRef}
        crossOrigin={'anonymous'}
        alt={`${album.name} cover`}
        src={image.url}
        width={image.height}
        height={image.width}
        onLoad={detectColor}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps.album.uri === nextProps.album.uri &&
    prevProps.paused === nextProps.paused
)

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
  //box-shadow: 0 1px 4px #ccc;
`
