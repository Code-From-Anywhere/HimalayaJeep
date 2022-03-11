import { api } from "ui";
import { useInfiniteQuery } from "react-query";
import useStore from "../Store";

export const useMessagePresets = () => {
  const [loginToken] = useStore("loginToken");
  return useInfiniteQuery(
    ["messagepresets", loginToken],
    () => {
      if (loginToken) {
        return api("getMeMessagePresets", "GET", {
          loginToken,
        });
      }
    },

    {
      getNextPageParam: (lastPage) => {
        if (!lastPage) {
          return false;
        }
        // should return false if there's no more pages available
        return {
          hasNextPage: false, // lastPage.hasMore,
          page: 2, //lastPage.pageNumber ? lastPage.pageNumber + 1 : 1,
        };
      },
      enabled: !!loginToken,
    }
  );
};
