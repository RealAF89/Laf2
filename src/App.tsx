import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Image, 
  IconButton, 
  Flex, 
  useColorModeValue, 
  Badge,
  Button,
  HStack
} from '@chakra-ui/react'
import { FaLaugh, FaShare, FaRegComment, FaHome, FaTrophy, FaUserCircle } from 'react-icons/fa'
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
      mx="auto"
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

const Navigation = () => {
  return (
    <HStack spacing={4}>
      <Button leftIcon={<FaHome />} variant="ghost" color="white" _hover={{ bg: 'blue.600' }}>
        Home
      </Button>
      <Button leftIcon={<FaTrophy />} variant="ghost" color="white" _hover={{ bg: 'blue.600' }}>
        Top
      </Button>
      <Button leftIcon={<FaUserCircle />} variant="ghost" color="white" _hover={{ bg: 'blue.600' }}>
        Profile
      </Button>
    </HStack>
  )
}

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('blue.500', 'blue.600')

  const memes = [
    { 
      imageUrl: 'https://i.imgur.com/vvLhqHg.jpeg', 
      title: 'When someone says they\'ll be ready in 5 minutes' 
    },
    { 
      imageUrl: 'https://i.imgur.com/p5KPdst.jpeg', 
      title: 'My reaction to any minor inconvenience' 
    },
    { 
      imageUrl: 'https://i.imgur.com/JfLxDpC.jpeg', 
      title: 'How I look waiting for my food delivery' 
    },
    { 
      imageUrl: 'https://i.imgur.com/RUq0PZC.jpeg', 
      title: 'Me trying to act natural when someone catches me dancing alone' 
    },
    {
      imageUrl: 'https://i.imgur.com/gDv2Ykf.jpeg',
      title: 'When the GPS says "You have arrived" but you clearly haven\'t'
    },
    {
      imageUrl: 'https://i.imgur.com/NXyQnN8.jpeg',
      title: 'Opening the fridge for the 10th time hoping food magically appeared'
    }
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={headerBg} color="white" py={6} position="sticky" top={0} zIndex={10} shadow="md">
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between">
            <Logo />
            <Navigation />
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.md" py={8} px={{ base: 4, md: 8 }}>
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
