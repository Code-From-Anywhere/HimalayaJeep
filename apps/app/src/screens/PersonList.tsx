import {
  ConnectionFilter,
  ConnectionOrder,
  ConnectionType,
  OrderDirection,
} from "core";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "react-query";
import { ActivityIndicator } from "react-with-native";
import Layout from "../components/Layout";
import { ListItem } from "../components/ListItem";
import { OrderSearchFilter } from "../components/OrderSearchFilter";
import { useLogin } from "../hooks/useLogin";
import { ScreenOptions } from "../Types";
import { api } from "ui";

export const ConnectionItem = ({
  item,
  order,
  search,
  filter,
}: {
  item: ConnectionType;
  order: ConnectionOrder | undefined;
  search: string;
  filter: ConnectionFilter | undefined;
}) => {
  const navigation = useNavigation<any>();
  return (
    <ListItem
      image={item.person?.picture}
      label={item.person?.name}
      subtitle={item.person?.email}
      onClick={() =>
        navigation.navigate("PersonScreen", { person: item.person })
      }
    />
  );
};
export const PersonList = () => {
  const { loginToken } = useLogin();
  const [filter, setFilter] = useState<ConnectionFilter | undefined>();
  const [order, setOrder] = useState<ConnectionOrder | undefined>();
  const [search, setSearch] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("ASC");

  const connections = useInfiniteQuery(
    [
      "connections",
      loginToken,
      filter,
      filterValue,
      order,
      orderDirection,
      search,
    ],
    ({ pageParam = { page: 1 } }) => {
      const pageNumber = Number(pageParam.page);

      if (loginToken) {
        const body = {
          loginToken,
          pageNumber,
          filter,
          filterValue,
          order,
          orderDirection,
        };
        // console.log({ body });
        return api("getMeConnections", "GET", body);
      }
    },

    {
      getNextPageParam: (lastPage) => {
        if (!lastPage) {
          return false;
        }

        // console.log({ lastPageHasMore: lastPage.hasMore });
        // should return false if there's no more pages available
        return {
          hasNextPage: lastPage.hasMore,
          page: lastPage.pageNumber ? Number(lastPage.pageNumber) + 1 : 1,
        };
      },
      enabled: !!loginToken,
    }
  );

  const allConnections = connections.data?.pages.reduce(
    (all, page) => all.concat(page?.data || []),
    [] as ConnectionType[]
  );

  return (
    <Layout>
      <OrderSearchFilter
        filter={filter}
        setFilter={setFilter}
        order={order}
        setOrder={setOrder}
        search={search}
        setSearch={setSearch}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
        filterOptions={[
          { label: "Email", value: "email" },
          { label: "Is premium", value: "isPremium" },
          { label: "Location", value: "location" },
          { label: "Name", value: "name" },
          { label: "Phone", value: "phone" },
          { label: "Tagline", value: "tagline" },
        ]}
        orderOptions={[
          { label: "Email", value: "email" },
          { label: "Is premium", value: "isPremium" },
          { label: "Location", value: "location" },
          { label: "Name", value: "name" },
          { label: "Phone", value: "phone" },
          { label: "Tagline", value: "tagline" },
        ]}
      />
      {/* show all connections with persons */}
      <FlatList
        data={allConnections || []}
        onRefresh={() => connections.refetch()}
        refreshing={connections.isRefetching && !connections.isFetchingNextPage}
        renderItem={({ item }) => (
          <ConnectionItem
            key={`item${item.id}`}
            item={item}
            order={order}
            search={search}
            filter={filter}
          />
        )}
        onEndReached={() => {
          connections.fetchNextPage();
        }}
        ListFooterComponent={() => {
          return connections.isLoading ? <ActivityIndicator /> : null;
        }}
      />
    </Layout>
  );
};

PersonList.options = {
  title: "My network",
} as ScreenOptions;
