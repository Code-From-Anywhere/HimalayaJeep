import { Div, Input } from "react-with-native";
import { Button as RWNButton } from "react-with-native";
import Select, { Item } from "react-with-native-select";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { OrderDirection } from "core";

export const OrderSearchFilter = <
  FilterType extends unknown,
  OrderType extends unknown
>({
  search,
  setSearch,
  order,
  setOrder,
  filter,
  setFilter,
  filterValue,
  setFilterValue,
  orderDirection,
  setOrderDirection,
  orderOptions,
  filterOptions,
}: {
  search: string;
  setSearch: (search: string) => void;
  order: OrderType;
  setOrder: (order: OrderType) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
  orderDirection: OrderDirection;
  setOrderDirection: (orderDirection: OrderDirection) => void;
  orderOptions: Item<OrderType>[];
  filterOptions: Item<FilterType>[];
}) => {
  return (
    <Div className="flex flex-row items-center py-2">
      <Select<FilterType>
        options={filterOptions}
        title="Filter"
        // ios={{ title: "Filter" }}
        value={{ value: filter, label: "Filter" }}
        onChange={async (value) => {
          if (value?.value) {
            setFilter(value.value);
            //setFilterValue(await prompt(value.label))
          }
        }}
      >
        {({ onClick, value, className }) => {
          return (
            <RWNButton onClick={onClick} className="px-4">
              <Feather name="filter" size={24} color="black" />
            </RWNButton>
          );
        }}
      </Select>

      <Div className="border border-gray-300 rounded-full flex flex-1 items-center p-2 flex-row">
        <Feather name="search" size={24} color="gray" />
        <Input
          native={{
            value: search,
            placeholder: "Search...",
            onChangeText: (text) => setSearch(text),
          }}
          className="ml-2 text-xl font-normal"
        />
      </Div>

      <Select<OrderDirection>
        options={[
          { label: "Ascending", value: "ASC" },
          { label: "Descending", value: "DESC" },
        ]}
        //  ios={{ title: "Direction" }}
        title={"Direction"}
        value={{ value: orderDirection, label: "Direction" }}
        onChange={(value) => {
          if (value?.value) {
            setOrderDirection(value.value);
          }
        }}
      >
        {({ onClick, value, className }) => {
          return (
            <Select<OrderType>
              options={orderOptions}
              //  ios={{ title: "Sort on" }}
              title={"Sort"}
              value={{ value: order, label: "Sort" }}
              onChange={(value) => {
                if (value?.value) {
                  setOrder(value.value);
                  onClick();
                }
              }}
            >
              {({ onClick, value, className }) => {
                return (
                  <RWNButton onClick={onClick} className="px-4">
                    <FontAwesome name="sort" size={24} color="black" />
                  </RWNButton>
                );
              }}
            </Select>
          );
        }}
      </Select>
    </Div>
  );
};
