import React, { useState } from 'react';
import { Box, Heading, HStack, Image, Text, Button, Input, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      alert("Product deleted successfully! 🗑️");
    } else {
      alert(`Error: ${message || "Failed to delete product."}`);
    }
  };

  const handleUpdateProduct = async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedProduct,
          price: Number(updatedProduct.price)
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        alert("Product updated successfully! 🎉");
        setIsOpen(false);
        window.location.reload(); 
      } else {
        alert(`Error: ${data.message || "Failed to update database."}`);
      }
    } catch (error) {
      alert(`Connection Error: ${error.message}`);
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={{ base: "white", _dark: "gray.800" }}
    >
      <Image 
        src={product.image} 
        alt={product.name} 
        h={48} 
        w="full" 
        objectFit="cover" 
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" color={{ base: "gray.600", _dark: "gray.200" }} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <Button size="sm" colorPalette="blue" variant="ghost" onClick={() => setIsOpen(true)}>
            <FaEdit />
          </Button>
          <Button 
            size="sm" 
            colorPalette="red" 
            variant="ghost"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <FaTrash />
          </Button>
        </HStack>
      </Box>

      {isOpen && (
        <Box 
          position="fixed" 
          top="0" 
          left="0" 
          w="full" 
          h="full" 
          bg="rgba(0,0,0,0.4)" 
          zIndex="9999" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Box bg={{ base: "white", _dark: "gray.800" }} p={6} rounded="lg" shadow="2xl" maxW="400px" w="full" mx={4}>
            <Heading size="md" mb={4}>Update Product</Heading>
            <VStack gap={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <HStack gap={2} w="full" justifyContent="flex-end" mt={2}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button colorPalette="blue" onClick={() => handleUpdateProduct(product._id)}>Update</Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;
