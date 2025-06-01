import { Box, Text, keyframes } from '@chakra-ui/react'
import { FaLaugh } from 'react-icons/fa'

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Logo = () => {
  const bounceAnimation = `${bounce} 2s ease-in-out infinite`
  const spinAnimation = `${spin} 15s linear infinite`

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      position="relative"
    >
      <Box
        position="relative"
        animation={bounceAnimation}
      >
        <Box
          as={FaLaugh}
          fontSize="3.5rem"
          color="yellow.300"
          filter="drop-shadow(0 0 8px rgba(0,0,0,0.3))"
        />
        <Box
          position="absolute"
          top="-2"
          right="-2"
          width="15px"
          height="15px"
          borderRadius="full"
          bg="red.400"
          animation={spinAnimation}
          transform="rotate(45deg)"
          _before={{
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '5px',
            height: '5px',
            borderRadius: 'full',
            bg: 'white',
          }}
        />
      </Box>
      <Text
        fontSize="3xl"
        fontWeight="black"
        letterSpacing="tight"
        color="white"
        textShadow="2px 2px 0 rgba(0,0,0,0.2)"
        fontFamily="'Segoe UI', sans-serif"
      >
        LAF
      </Text>
    </Box>
  )
}

export default Logo 