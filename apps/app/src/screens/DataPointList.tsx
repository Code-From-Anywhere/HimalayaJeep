import { DataPointType } from "core";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "react-query";
import { ActivityIndicator, Div } from "react-with-native";
import Layout from "../components/Layout";
import { ListItem } from "../components/ListItem";
import { useLogin } from "../hooks/useLogin";
import { ScreenOptions } from "../Types";
import { api } from "ui";

export const DataPointItem = ({ item }: { item: DataPointType }) => {
  const navigation = useNavigation<any>();
  return (
    <ListItem
      label={item.label}
      subtitle={item.type}
      onClick={() =>
        navigation.navigate("DataPointScreen", { dataPoint: item })
      }
    />
  );
};
export const DataPointList = () => {
  const { loginToken } = useLogin();

  const datapoints = useInfiniteQuery(
    ["datapoints", loginToken],
    () => {
      if (loginToken) {
        return api("getMeDataPoints", "GET", {
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

  const allDataPoints = datapoints.data?.pages.reduce(
    (all, page) => all.concat(page?.dataPoints || []),
    [] as DataPointType[]
  );

  const navigation = useNavigation<any>();
  return (
    <Layout>
      <FlatList
        data={allDataPoints || []}
        onRefresh={() => datapoints.refetch()}
        refreshing={datapoints.isRefetching}
        renderItem={({ item }) => (
          <DataPointItem key={`item${item.id}`} item={item} />
        )}
        ListFooterComponent={() => {
          return (
            <Div>
              <ListItem
                label={"New Datapoint"}
                onClick={() => navigation.navigate("DataPointScreen")}
              />
              {datapoints.isLoading ? <ActivityIndicator /> : null}
            </Div>
          );
        }}
      />
    </Layout>
  );
};

DataPointList.options = {
  title: "Datapoints",
} as ScreenOptions;
