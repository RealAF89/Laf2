import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  useToast
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

interface CreatePostProps {
  onPost: (post: { imageUrl: string; title: string }) => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [title, setTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Please select an image under 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !title.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both an image and a title',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      // Upload image to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`
      const filePath = `public/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('memes')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('memes')
        .getPublicUrl(filePath)

      // Create post record in the database
      const { error: dbError } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim(),
            image_url: publicUrl,
            storage_path: filePath
          }
        ])

      if (dbError) throw dbError

      onPost({
        imageUrl: publicUrl,
        title: title.trim()
      })

      // Reset form
      setTitle('')
      setSelectedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      toast({
        title: 'Post created!',
        description: 'Your funny content has been posted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: 'Error creating post',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="xl" 
      p={6} 
      bg="white" 
      mb={8}
      shadow="sm"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Upload a funny image or GIF</FormLabel>
            <Input
              type="file"
              accept="image/*,.gif"
              onChange={handleFileChange}
              ref={fileInputRef}
              p={1}
              disabled={isLoading}
            />
            {previewUrl && (
              <Box mt={2}>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  style={{ 
                    maxHeight: '200px', 
                    maxWidth: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </Box>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Add a funny caption</FormLabel>
            <Input
              placeholder="What's the story behind this?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full"
            isDisabled={!selectedFile || !title.trim() || isLoading}
            isLoading={isLoading}
            loadingText="Posting..."
          >
            Post to LAF
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default CreatePost 