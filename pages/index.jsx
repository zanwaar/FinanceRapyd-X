import Head from "next/head";
import {
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [sdata, setSdata] = useState({});
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    let url_data = window.location.protocol + "//" + window.location.host;
    const requestBody = {
      amount: 123.45,
      complete_payment_url:
        "https://finance-rapyd-x.vercel.app/payment/success",
      country: "ID",
      currency: "IDR",
      error_payment_url: "https://finance-rapyd-x.vercel.app/payment/error",
      language: "en",
      expiration: 1685567906,
    };

    axios
      .post("/api/rapyd", requestBody)
      .then((response) => {
        let data = JSON.parse(response.data);
        setSdata(data);
        console.log(data.data.redirect_url);
        console.log(sdata);
        router.push(data.data.redirect_url);
        // Lakukan tindakan lanjutan setelah pembuatan payment method berhasil
      })
      .catch((error) => console.error(error));
  };

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
            <Heading
              pt={{ base: "5", md: "10" }}
              fontSize={{ base: "2xl", md: "3xl" }}
              color={"teal"}
            >
              Payment Methods
            </Heading>
            <form onSubmit={handleSubmit}>
              <Stack display={{ base: "flex", md: "flex" }}>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  size="md"
                  bgColor={"teal"}
                  shadow={"md"}
                  color={"white"}
                  _hover={
                    {bgColor: "teal.700"}
                  }
                >
                  Pay
                </Button>
              </Stack>

              {/* <button type="submit">Create</button> */}
            </form>
            {/* <ul>
              {paymentMethods.map((method) => (
                <li key={method.id}>{method.name}</li>
              ))}
            </ul> */}
          </Stack>
        </Layout>
      </main>
    </>
  );
}
