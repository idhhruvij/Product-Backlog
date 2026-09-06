import { useEffect } from 'react';
import { Container, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="1200px" py={12}>
      <VStack gap={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient="to-r"
          gradientFrom="#7928CA"
          gradientTo="#FF0080"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        {products.length === 0 && (
          <Text fontSize="20px" color="gray.500" textAlign="center">
            No products available.{' '}
            <Link to="/create" style={{ color: '#FF0080', textDecoration: 'underline' }}>
              Create a Product
            </Link>
          </Text>
        )}

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
