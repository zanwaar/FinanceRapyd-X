import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
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
      <Alert
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign="center"
        position={"relative"}
        status="error"
        variant="subtle"
        flexDirection="column"
      >
        <Box
          position={"absolute"}
          zIndex={20}
          top={{ base: "5", md: "5" }}
          right={{ base: "5", md: "5" }}
        >
          <Box
            as="a"
            fontSize={"sm"}
            cursor={"pointer"}
            _hover={{
              fontSize: "md",
              transform: "translateY(-5px)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            onClick={closed}
          >
            <CloseIcon size={"30px"} />
          </Box>
        </Box>
        <AlertIcon boxSize="100px" mr={0} />

        <AlertTitle fontSize="4xl" mt={9} mb={6}>
          Payment Failed!
        </AlertTitle>

        <Stack display={"flex"} spacing={6}>
          <AlertDescription maxWidth="sm">
            An error occurred, the payment process failed
          </AlertDescription>
          <Button
            isLoading={isLoading}
            onClick={closed}
            size="md"
            bgColor={"blackAlpha.800"}
            color={"white"}
            shadow={"md"}
            borderRadius={"xl"}
            _hover={{
              bgColor: "blackAlpha.700",
            }}
          >
            close
          </Button>
        </Stack>
      </Alert>
    </>
  );
}
