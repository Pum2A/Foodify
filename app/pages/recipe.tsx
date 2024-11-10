import { Box, Heading, Text } from "@chakra-ui/react";

const RecipeDetails = () => {
  return (
    <Box p={4}>
      <Heading as="h2">Recipe Name</Heading>
      <Text mt={2}>Detailed recipe information goes here.</Text>
    </Box>
  );
};

export default RecipeDetails;
