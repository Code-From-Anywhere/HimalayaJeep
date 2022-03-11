import { TeamType } from "core";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { ActivityIndicator, Div } from "react-with-native";
import Layout from "../components/Layout";
import { ListItem } from "../components/ListItem";
import { ScreenOptions } from "../Types";
import { useTeams } from "../hooks/useTeams";

export const TeamItem = ({ item }: { item: TeamType }) => {
  const navigation = useNavigation<any>();
  return (
    <ListItem
      label={item.name}
      subtitle={`${item.teamMembers?.length} members`}
      onClick={() => navigation.navigate("TeamScreen", { team: item })}
    />
  );
};
export const TeamList = () => {
  const navigation = useNavigation<any>();
  const teams = useTeams();
  const allTeams = teams.data?.teams;

  return (
    <Layout>
      <FlatList
        data={allTeams || []}
        onRefresh={() => teams.refetch()}
        refreshing={teams.isRefetching}
        renderItem={({ item }) => (
          <TeamItem key={`item${item.id}`} item={item} />
        )}
        ListFooterComponent={() => {
          return (
            <Div>
              <ListItem
                label={"New Team"}
                subtitle={`Create a new team`}
                onClick={() => navigation.navigate("TeamScreen")}
              />
              {teams.isLoading ? <ActivityIndicator /> : null}
            </Div>
          );
        }}
      />
    </Layout>
  );
};

TeamList.options = {
  title: "Teams",
} as ScreenOptions;
