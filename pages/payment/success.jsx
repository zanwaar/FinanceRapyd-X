import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Success() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const closed = (e) => {
    e.preventDefault();
      setIsLoading(true);
    router.push("/");
  };
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign="center"
        position={"relative"}
        px={10}
        bg={
          "linear-gradient(90deg, rgba(1,100,226,1) 0%, rgba(13,119,255,1) 100%)"
        }
      >
        <Box
          position={"absolute"}
          zIndex={20}
          top={{ base: "5", md: "5" }}
          right={{ base: "5", md: "5" }}
        >
          <Box
            as="a"
            fontSize={'sm'}
            cursor={"pointer"}
            _hover={{
              fontSize: "md",
              transform: "translateY(-5px)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            onClick={closed}
          >
            <CloseIcon size={"30px"} color={"white"} />
          </Box>
        </Box>
        <Stack maxW={"2xl"} spacing={5}>
          <Box>
            <CheckCircleIcon
              boxSize={{ base: "100px", md: "100px" }}
              color={"white"}
              mb={5}
            />
          </Box>

          <Heading as="h2" size="2xl" color={"white"}>
            Success!
          </Heading>
          <Heading as="h6" color={"whiteAlpha.700"} size="">
            Thank you for payment, it has been successfully processed
          </Heading>
          <Stack display={{ base: "flex", md: "flex" }}>
            <Button
            isLoading={isLoading}
              onClick={closed}
              size="md"
              bgColor={"white"}
              borderRadius={"xl"}
            >
              Done
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
