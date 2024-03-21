import { QueryClientKey } from "@/constants/QueryClientKey";
import { TimeFormat } from "@/constants/TimeFormat";
import { useTranslation } from "@/hooks/useTranslation";
import { getProductsApi } from "@/services/commercetools/products";
import { getStoresApi } from "@/services/commercetools/stores";
import { LocalizedString, Store } from "@commercetools/platform-sdk";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryClientKey.GetStores],
    queryFn: () => getStoresApi(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Stores() {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = localStorage?.getItem(QueryClientKey.UserInfo);
    console.log(user);
    setUser(user || "");
  }, []);

  const { data } = useQuery({
    queryKey: [QueryClientKey.GetStores],
    queryFn: () => getStoresApi(),
  });

  const stores = user === "market_lead" ? data : [data?.[0]];

  const { t } = useTranslation();

  const handleStoreClick = (store: Store) => {
    const productSelectionId =
      store.productSelections?.[0].productSelection?.id;
    if (productSelectionId) {
      router.push(`/stores/${productSelectionId}`);
    }
  };

  return (
    <div>
      <div className="my-10 flex flex-row gap-4 items-baseline">
        <h1 className="text-bold text-3xl ">Stores</h1>
        <div className="text-gray-500">{stores?.length} results</div>
      </div>
      <div>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="border border-gray-200 bg-gray-100 text-left">
            <tr>
              <th className="pl-4 py-2">Name</th>
              <th className="pl-4 py-2">Key</th>
              <th className="pl-4 py-2">Date created</th>
              <th className="pl-4 py-2">Date modified</th>
            </tr>
          </thead>
          <tbody>
            {stores?.map((store) => {
              return (
                <tr
                  key={store.id}
                  className="border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                  onClick={() => handleStoreClick(store)}
                >
                  <td className="pl-4 py-2">{t(store?.name)}</td>
                  <td className="pl-4 py-2">{store.key}</td>
                  <td className="pl-4 py-2">
                    {dayjs(store.createdAt).format(TimeFormat.DateTime)}
                  </td>
                  <td className="pl-4 py-2">
                    {dayjs(store.lastModifiedAt).format(TimeFormat.DateTime)}
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
