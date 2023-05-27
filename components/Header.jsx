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
              <Heading size="md">
                {session.user.email ?? session.user.name}
              </Heading>
            </Box>
            <Spacer />

            <Button
              rightIcon={<FiLogOut />}
              colorScheme="teal"
              variant="outline"
              fontSize={15}
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
