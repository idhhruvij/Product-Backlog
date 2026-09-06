import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { Link } from "react-router-dom"
import { FaRegPlusSquare } from "react-icons/fa"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
          color="transparent"
        >
          <Link to="/">Product Store 🚀</Link>
        </Text>

        <HStack gap={4} alignItems="center">
          <Link to="/create">
            <Button variant="ghost">
              <FaRegPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar;
