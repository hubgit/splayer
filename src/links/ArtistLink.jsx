import React from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { uriToID } from '../lib'

export const ArtistLink = ({ artist, children, className }) => {
  /*const [anchor, setAnchor] = useState(null)

  const closePopover = useCallback(() => {
    setAnchor(false)
  }, [])

  const togglePopover = useCallback(event => {
    if (!event.meta) {
      event.preventDefault()
      setAnchor(anchor => (anchor ? null : event.currentTarget))
    }
  }, [])

  const open = Boolean(anchor)*/

  return (
    <>
      <Link
        to={`/artists/${uriToID(artist.uri)}`}
        popularity={artist.popularity}
        className={className}
        // onClick={togglePopover}
      >
        {children}
      </Link>

      {/*      <Popover
        open={open}
        anchorEl={anchor}
        onClose={closePopover}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'center',
        // }}
        // transformOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center',
        // }}
        disableRestoreFocus
      >
        <PopoverArtistAlbums artist={artist} isPopover={true} />
      </Popover>*/}
    </>
  )
}

const Link = styled(PopularityLink)`
  text-align: center;
  margin: 8px;
`

/*
const PopoverArtistAlbums = styled(ArtistAlbums)`
  width: 600px;
  height: 300px;
  overflow: auto;
`
*/
