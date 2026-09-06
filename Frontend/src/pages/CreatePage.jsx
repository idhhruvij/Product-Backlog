import { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product"; 

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    
    if (success) {
      alert("Product created successfully! 🎉");
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      alert(`Error: ${message || "Please fill in all fields."}`);
    }
  };

  return (
    <Container maxW="4xl" paddingY={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>  
        <Box w="full" bg={{ base: "white", _dark: "gray.800" }} p={6} rounded="lg" shadow="md">
          <VStack gap={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}          
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}          
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}          
            />
            <Button onClick={handleAddProduct} w='full' colorPalette="blue">
              Add Product
            </Button>
          </VStack>  
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
