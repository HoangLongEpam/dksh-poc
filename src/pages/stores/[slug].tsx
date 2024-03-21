import { QueryClientKey } from "@/constants/QueryClientKey";
import { TimeFormat } from "@/constants/TimeFormat";
import { useTranslation } from "@/hooks/useTranslation";
import { getProductSelectionByIdApi } from "@/services/commercetools/product-selections";
import {
  getProductByIdApi,
  getProductsByProductSelectionIdApi,
} from "@/services/commercetools/products";
import {
  QueryClient,
  dehydrate,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import stores from ".";
import { AssignedProductReference, Product } from "@commercetools/platform-sdk";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const ID = context?.params?.slug;

  if (ID && typeof ID === "string") {
    const products = await queryClient.fetchQuery({
      queryKey: [QueryClientKey.GetProductsByProductSelection, ID],
      queryFn: () => getProductsByProductSelectionIdApi(ID),
    });

    const ids = products?.map((product) => {
      return product?.product?.id;
    });

    for (const id of ids) {
      await queryClient.prefetchQuery({
        queryKey: [QueryClientKey.GetProductById, id],
        queryFn: () => getProductByIdApi(id),
      });
    }

    await queryClient.prefetchQuery({
      queryKey: [QueryClientKey.GetProductSelectionById, ID],
      queryFn: () => getProductSelectionByIdApi(ID),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function ProductByStore() {
  const router = useRouter();
  const { t } = useTranslation();

  const ID = router.query.slug as string;

  const { data: productSelection } = useQuery({
    queryKey: [QueryClientKey.GetProductSelectionById, ID],
    queryFn: () => getProductSelectionByIdApi(ID),
  });

  const { data: productsRef } = useQuery({
    queryKey: [QueryClientKey.GetProductsByProductSelection, ID],
    queryFn: () => getProductsByProductSelectionIdApi(ID),
  });



  const results = useQueries({
    queries: (productsRef as AssignedProductReference[])?.map((product) => {
      return {
        queryKey: [QueryClientKey.GetProductById, product?.product?.id],
        queryFn: () => getProductByIdApi(product?.product?.id),
      };
    }),
  });

  if (!productsRef || productsRef.length === 0) {
    return <div>No products</div>;
  }


  

  const products = results.map((result) => {
    return result.data as Product;
  });


  return (
    <div>
      <div className="my-10 flex flex-row gap-4 items-baseline">
        <h1 className="text-bold text-3xl ">{t(productSelection?.name)}</h1>
        <div className="text-gray-500">{products?.length} results</div>
      </div>

      <div>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="border border-gray-200 bg-gray-100 text-left">
            <tr>
              <th className="pl-4 py-2">Product name</th>
              <th className="pl-4 py-2">Product key</th>
              <th className="pl-4 py-2">Date created</th>
              <th className="pl-4 py-2">Date modified</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products?.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                  >
                    <td className="pl-4 py-2">
                      {t(product?.masterData?.current?.name)}
                    </td>
                    <td className="pl-4 py-2">{product?.key}</td>
                    <td className="pl-4 py-2">
                      {dayjs(product?.createdAt).format(TimeFormat.DateTime)}
                    </td>
                    <td className="pl-4 py-2">
                      {dayjs(product?.lastModifiedAt).format(
                        TimeFormat.DateTime
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
