import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Auth() {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  let redirectUrl = process.env.NEXTAUTH_URL;

  useEffect(() => {
    const url = new URL(document.location).searchParams;
    redirectUrl = url.get("callbackUrl");
    if (session) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [session]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          {/* <Heading fontSize={"4xl"}>Sign in to your account</Heading> */}
          <Heading fontSize={{ base: "4xl", lg: "5xl" }}>
            Finance Rapyd X
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={5}
        >
          <Button
            w={"full"}
            maxW={"md"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            onClick={() => {
              signIn("google", {
                callbackUrl: redirectUrl,
              });
            }}
            isLoading={isLoading}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}
