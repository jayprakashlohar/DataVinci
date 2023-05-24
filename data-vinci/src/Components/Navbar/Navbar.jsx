import { Box, Button, Text } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

const Navbar = () => {
  return (
    <>
      <Box
        border="1px solid black"
        p="10px"
        display="flex"
        justifyContent="space-between"
        background="black"
        color="#fff"
        fontWeight="bold"
        borderTopLeftRadius="5px"
        borderTopRightRadius="5px"
      >
        <Box>
          <Text fontSize="25px" fontFamily="cursive">
            Campaigns
          </Text>
        </Box>
        <Box display="flex" gap="20px" alignItems="center">
          <Text>Today</Text>
          <Text>This Week</Text>
          <Text>Month</Text>
          <Text>Year</Text>

          <Button
            borderRadius="0"
            leftIcon={<BiPlus />}
            colorScheme="teal"
            variant="solid"
          >
            New Campaigns
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { Navbar };
