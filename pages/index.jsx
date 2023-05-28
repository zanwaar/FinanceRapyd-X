import Head from "next/head";
import { Flex, Heading, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg="white">
          <Spinner />
        </Flex>
      </>
    );
  }
  return (
    <>
      <main>
        <Layout>
          <Stack spacing={10}>
            <Heading pt={{base:'5', md:'10'}} fontSize={{base:"2xl", md:"3xl"}} color={"teal"}>
              Finance Service
            </Heading>
          </Stack>
        </Layout>
      </main>
    </>
  );
}
