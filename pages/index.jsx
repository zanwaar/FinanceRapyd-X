import Head from "next/head";
import { Flex, Heading, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
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
            <Heading pt={10} color={"teal"}>
              Finance Service
            </Heading>
          </Stack>
        </Layout>
      </main>
    </>
  );
}
