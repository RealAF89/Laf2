import { Image, Text, VStack, HStack } from '@chakra-ui/react'

const Logo = () => {
  return (
    <HStack spacing={4} align="center">
      <Image 
        src="/images/laflogo.png" 
        alt="LAF Logo"
        height="50px"
        objectFit="contain"
      />
      <VStack spacing={0} align="start">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="wider"
          color="black"
          fontFamily="'Inter', sans-serif"
          textTransform="uppercase"
          lineHeight="1"
        >
          LAF
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          fontFamily="'Inter', sans-serif"
          fontWeight="light"
          letterSpacing="tight"
        >
          Want a laugh?
        </Text>
      </VStack>
    </HStack>
  )
}

export default Logo 