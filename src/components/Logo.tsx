import { Box, Image } from '@chakra-ui/react'

const Logo = () => {
  return (
    <Box>
      <Image 
        src="/images/laflogo.png" 
        alt="LAF Logo"
        height="50px"
        objectFit="contain"
      />
    </Box>
  )
}

export default Logo 