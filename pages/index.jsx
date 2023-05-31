import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PaymentIcon from "../components/icon";
import SelectInput from "../components/SelectInput";

export default function Home() {
  const { data: session } = useSession();

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState(100000);
  const [country, setCountry] = useState();
  const [currency, setCurrency] = useState();
  const [currencySign, setCurrencySign] = useState("");

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const url_success = "https://finance-rapyd-x.vercel.app/payment/success";
    const url_error = "https://finance-rapyd-x.vercel.app/payment/error";
    const currentTime = new Date();
    const expirationTime = new Date(
      currentTime.getTime() + 24 * 60 * 60 * 1000
    );
    const expirationTimestamp = Math.floor(expirationTime.getTime() / 1000);
    const requestBody = {
      amount: amount,
      complete_payment_url: url_success,
      country: country,
      currency: currency,
      error_payment_url: url_error,
      language: "en",
      expiration: expirationTimestamp,
    };
    axios
      .post("/api/rapyd", requestBody)
      .then((response) => {
        // console.log(response);
        let data = JSON.parse(response.data);
        router.push(data.data.redirect_url);
      })
      .catch((error) => {
        // console.error(error);
        toast({
          position: "top-right",
          title: "Incorrect currency code request",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    axios
      .get("api/rapyd/country")
      .then((response) => {
        let data_country = JSON.parse(response.data);
        setOptions(data_country.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    const results = options.filter((option) => option.id === selectedOption);
    setSearchResults(results);

    results.map((item) => {
      setCountry(item.iso_alpha2);
      setCurrency(item.currency_code);
      setCurrencySign(item.currency_sign);
    });
  };
  if (!session) {
    return (
      <>
        <Flex
          zIndex={100}
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="white"
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
          <Stack>
            <Heading
              pt={{ base: "5", md: "10" }}
              fontSize={{ base: "2xl", md: "3xl" }}
              color={"teal"}
            >
              Payment
            </Heading>
            <Stack spacing={2}>
              <Text color={"gray.600"}>
                Accept payments from more than 100 countries
              </Text>
              <SelectInput
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </Stack>

            <Stack align={"center"} justify={"center"} alignItems={"center"}>
              <Box w={{ base: "350px", md: "400px" }}>
                <PaymentIcon />
              </Box>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack>
                {currencySign && (
                  <Button
                    disabled
                    type="submit"
                    isLoading={isLoading}
                    size="md"
                    bgColor={"teal"}
                    shadow={"md"}
                    color={"white"}
                    _hover={{ bgColor: "teal.700" }}
                  >
                    Test Pay &nbsp;{currencySign}&nbsp;
                    {amount.toLocaleString({
                      style: "currency",
                      currency: "IDR",
                    })}
                    &nbsp;{currency}
                  </Button>
                )}
                {searchResults.map((result) => (
                  <Box key={result.id}>
                    <Text color={"gray.600"}>
                      Currency Name&nbsp;:&nbsp;
                      {result.currency_name}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </form>
          </Stack>
        </Layout>
      </main>
    </>
  );
}
