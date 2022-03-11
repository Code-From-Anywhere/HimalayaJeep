import { TeamMemberType, TeamType } from "core";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import Layout from "../components/Layout";
import { ListItem } from "../components/ListItem";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { isValidVarchar } from "../Util";
import { api } from "ui";
import useStore from "../Store";
import { Div } from "react-with-native";
import { useTeams } from "../hooks/useTeams";

export const TeamMemberItem = ({ item }: { item: TeamMemberType }) => {
  const navigation = useNavigation<any>();
  return (
    <ListItem
      label={item.user?.name || `user ${item.userId}`}
      subtitle={item.role}
      onClick={() =>
        navigation.navigate("TeamMemberScreen", {
          teamMember: item,
          teamId: item.teamId,
        })
      }
    />
  );
};

const TeamForm = ({ team }: { team?: TeamType }) => {
  const [loginToken] = useStore("loginToken");
  const teams = useTeams();
  const navigation = useNavigation<any>();
  const fields = [
    makeField("text", {
      field: "name",
      title: "Name",
      extra: {
        placeholder: "Name",
      },
      hasError: (value) =>
        !isValidVarchar(value as string, false) ? "Fill in a name" : false,
    }),
  ];

  return (
    <Div className="p-4">
      <Form<{
        name: string;
      }>
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          if (!loginToken) return reject("Please login");
          const { name } = values;
          const { response, success } = await api("upsertTeam", "POST", {
            loginToken,
            team: { name },
            id: team?.id,
          });
          if (success) {
            resolve(response);
            teams.refetch();
            if (!team?.id) {
              //it's a new team, so let's go back to your team list
              navigation.goBack();
            }
          } else {
            reject(response);
          }
        }}
        initialValues={{
          name: team?.name,
        }}
      />
    </Div>
  );
};

export const TeamScreen = ({ route }: { route: any }) => {
  const team: TeamType | undefined = route.params?.team;
  const navigation = useNavigation<any>();
  const allTeamMembers = team?.teamMembers;
  return (
    <Layout>
      {team ? (
        <FlatList
          ListHeaderComponent={() => <TeamForm team={team} />}
          data={allTeamMembers || []}
          renderItem={({ item }) => (
            <TeamMemberItem key={`item${item.id}`} item={item} />
          )}
          ListFooterComponent={() => {
            return (
              <ListItem
                label={"New Team Member"}
                subtitle={"Add a new team-member"}
                onClick={() =>
                  navigation.navigate("TeamMemberScreen", {
                    teamId: team?.id,
                  })
                }
              />
            );
          }}
        />
      ) : (
        <TeamForm />
      )}
    </Layout>
  );
};

TeamScreen.options = ({ route }: { route: any }) =>
  ({
    title: route.params?.team?.name || "New Team",
  } as ScreenOptions);
