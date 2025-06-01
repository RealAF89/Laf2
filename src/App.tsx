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
  HStack,
  Spinner,
  Center
} from '@chakra-ui/react'
import { FaLaugh, FaShare, FaRegComment, FaHome, FaTrophy, FaUserCircle } from 'react-icons/fa'
import Logo from './components/Logo'
import CreatePost from './components/CreatePost'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import type { Post } from './lib/supabase'

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
      <Button leftIcon={<FaHome />} variant="ghost" color="black" _hover={{ bg: 'gray.100' }}>
        Home
      </Button>
      <Button leftIcon={<FaTrophy />} variant="ghost" color="black" _hover={{ bg: 'gray.100' }}>
        Top
      </Button>
      <Button leftIcon={<FaUserCircle />} variant="ghost" color="black" _hover={{ bg: 'gray.100' }}>
        Profile
      </Button>
    </HStack>
  )
}

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'white')

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const { error } = await supabase.from('posts').select('count').single()
        if (error) {
          console.error('Supabase connection error:', error)
          setError('Database connection failed. Please check your credentials.')
        } else {
          console.log('Supabase connected successfully!')
          fetchPosts()
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to connect to the database.')
      }
    }
    testConnection()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPost = async (post: { imageUrl: string; title: string }) => {
    setPosts(prevPosts => [{
      id: Date.now(), // temporary ID until refresh
      created_at: new Date().toISOString(),
      title: post.title,
      image_url: post.imageUrl,
      storage_path: '' // This will be set by CreatePost component
    }, ...prevPosts])
  }

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
        <CreatePost onPost={handleNewPost} />
        
        {isLoading ? (
          <Center py={10}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : error ? (
          <Center py={10}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : (
          <VStack spacing={8} align="stretch">
            {posts.map((post) => (
              <MemeCard 
                key={post.id} 
                imageUrl={post.image_url} 
                title={post.title} 
              />
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default App
