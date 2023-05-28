import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="gray.800"
        >
          <Spinner />
        </Flex>
      </>
    );
  }

  return (
    <>
      {session && (
        <Box bg="white" py={{ base: "2", md: "5" }} px={{ base: "4", md: "0" }}>
          <Flex maxW={"3xl"} alignItems="center" gap="2">
            <Avatar
              size={{ base: "xs", md: "md" }}
              name={session.user.name}
              src={session.user.image}
            />
            <Box p="2">
              <Heading fontSize={{ base: "xs", md: "md" }}>
                {session.user.email ?? session.user.name}
              </Heading>
            </Box>
            <Spacer />
            <Box
              as="a"
              display={{ base: "block", md: "none" }}
              borderRadius="full"
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                signOut();
              }}
            >
              <FiLogOut />
            </Box>
            <Button
              display={{ base: "none", md: "flex" }}
              size="md"
              rightIcon={<FiLogOut />}
              colorScheme="teal"
              variant="outline"
              borderRadius="full"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Log Out
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};
