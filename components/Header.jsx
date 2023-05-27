import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <>
      {session && (
        <Box bg="white" p="5">
          <Flex maxW={"3xl"} alignItems="center" gap="2">
            <Avatar name="Dan Abrahmov" src={session.user.image} />
            <Box p="2">
              <Heading fontSize={{ base: "12px", md: "18px" }}>
                {session.user.email ?? session.user.name}
              </Heading>
            </Box>
            <Spacer />

            <Button
              size={{ base: "xs", md: "sm", lg: "md" }}
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