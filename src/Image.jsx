import React from 'react'

export const Image = ({ album, state }) => {
  if (!album.images) {
    return null
  }

  const image = album.images.find(
    image => image.width === 300 || image.height === 300
  )

  if (!image) {
    return null
  }

  // const borderWidth = ((state.duration - state.position) / state.duration) * 200
  const borderWidth = 100

  return (
    <img
      alt={`${album.name} cover`}
      src={image.url}
      width={300}
      height={300}
      style={{
        borderRadius: '50%',
        border: `${borderWidth}px solid black`,
        width: 300,
        padding: 4,
        maxWidth: '100%',
        animation: state.paused ? 'none' : 'spin 4s linear infinite',
      }}
    />
  )
}
