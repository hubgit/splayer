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
      image => image.width >= 600 || image.height >= 600
    )

    const detectColor = useCallback(() => {
      const vibrant = new Vibrant(imageRef.current)

      vibrant.getPalette().then(palette => {
        setBackgroundColor(palette.LightVibrant.hex)
      })
    }, [imageRef, setBackgroundColor])

    const enterFullScreen = useCallback(() => {
      if (imageRef.current) {
        imageRef.current.requestFullscreen()
      }
    }, [imageRef])

    if (!image) {
      return null
    }

    return (
      <Image
        ref={imageRef}
        crossOrigin={'anonymous'}
        alt={`${album.name} cover`}
        src={image.url}
        width={image.width}
        height={image.height}
        onLoad={detectColor}
        onClick={enterFullScreen}
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
