import Image from "next/image";
import { Inter } from "next/font/google";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getProductsApi } from "@/services/commercetools/products";
import { getStoresApi } from "@/services/commercetools/stores";
import { use } from "react";
import { QueryClientKey } from "@/constants/QueryClientKey";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: () => getStoresApi(),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Home Page</h1>
    </main>
  );
}
