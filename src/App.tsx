import { Box, Container, Heading, Text, VStack, Image, IconButton, Flex, useColorModeValue, Badge } from '@chakra-ui/react'
import { FaLaugh, FaShare, FaRegComment } from 'react-icons/fa'
import Logo from './components/Logo'

interface MemeCardProps {
  imageUrl: string
  title: string
}

const MemeCard = ({ imageUrl, title }: MemeCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="xl"
      overflow="hidden" 
      bg={cardBg}
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.400'
      }}
      maxW="600px"
      w="100%"
    >
      <Box position="relative">
        <Image 
          src={imageUrl} 
          alt={title} 
          width="100%" 
          height="auto" 
          objectFit="cover"
        />
        <Badge 
          position="absolute" 
          top="4" 
          right="4" 
          colorScheme="blue" 
          fontSize="sm"
          borderRadius="full"
          px="3"
        >
          Fresh
        </Badge>
      </Box>
      <Box p={6}>
        <Heading size="md" mb={4} lineHeight="1.4">{title}</Heading>
        <Flex justify="space-between" align="center">
          <Flex gap={2}>
            <IconButton
              aria-label="Share meme"
              icon={<FaShare />}
              size="md"
              colorScheme="blue"
              variant="ghost"
              _hover={{ bg: 'blue.50' }}
            />
            <IconButton
              aria-label="Like meme"
              icon={<FaLaugh />}
              size="md"
              variant="ghost"
              colorScheme="yellow"
              _hover={{ bg: 'yellow.50' }}
            />
            <IconButton
              aria-label="Comment"
              icon={<FaRegComment />}
              size="md"
              variant="ghost"
              colorScheme="gray"
              _hover={{ bg: 'gray.50' }}
            />
          </Flex>
          <Text color="gray.500" fontSize="sm">2 hours ago</Text>
        </Flex>
      </Box>
    </Box>
  )
}

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('blue.500', 'blue.600')

  const memes = [
    { 
      imageUrl: 'https://placehold.co/600x400?text=Funny+Meme+1', 
      title: 'When the code works on the first try and you have no idea why' 
    },
    { 
      imageUrl: 'https://placehold.co/600x400?text=Funny+Meme+2', 
      title: 'Developer Life: Expectations vs Reality - A never-ending story' 
    },
    { 
      imageUrl: 'https://placehold.co/600x400?text=Funny+Meme+3', 
      title: 'That moment when you finally fix the bug that has been haunting you for days' 
    },
    { 
      imageUrl: 'https://placehold.co/600x400?text=Funny+Meme+4', 
      title: 'Me explaining my code to my rubber duck debugging assistant' 
    },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={headerBg} color="white" py={6} position="sticky" top={0} zIndex={10} shadow="md">
        <Container maxW="container.lg">
          <VStack align="center" spacing={3}>
            <Logo />
            <Text fontSize="lg" opacity={0.9}>Want a laugh?</Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          {memes.map((meme, index) => (
            <MemeCard key={index} {...meme} />
          ))}
        </VStack>
      </Container>
    </Box>
  )
}

export default App
