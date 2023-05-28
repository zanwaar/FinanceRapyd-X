import Head from "next/head";
import { Heading, Spinner, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Spinner />
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
