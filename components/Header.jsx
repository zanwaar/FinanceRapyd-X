import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {session && (
        <Box bg="white" py={{ base: "3", md: "5" }} px={{ base: "4", md: "0" }}>
          {isLoading && <Spinner color="teal" />}
          <Flex maxW={"3xl"} alignItems="center" gap="2">
            <Avatar
              size={{ base: "sm", md: "md" }}
              name={session.user.name}
              src={session.user.image}
            />
            <Box p="2">
              <Heading fontSize={{ base: "sm", md: "md" }}>
                {session.user.name ?? session.user.email}
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
              size="sm"
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
