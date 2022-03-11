import { TeamMemberType, TeamRole } from "core";
import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { isValidVarchar, isEmail } from "../Util";
import { api } from "ui";
import useStore from "../Store";
import { useTeams } from "../hooks/useTeams";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Button as RWNButton } from "react-with-native";

export const TeamMemberScreen = ({ route }: { route: any }) => {
  const teamId: number = route.params?.teamId;
  const teamMember: TeamMemberType | undefined = route.params?.teamMember;
  const teams = useTeams();
  const navigation = useNavigation();

  const [loginToken] = useStore("loginToken");
  const fields = [
    makeField("text", {
      field: "email",
      title: "Email",
      shouldHide: () => !!teamId,
      extra: {
        placeholder: "Email of your new teammember (invite will be sent)",
      },
      hasError: (value) =>
        !isValidVarchar(value as string, false)
          ? "Fill in an email"
          : !isEmail(value)
          ? "Fill in a correct email"
          : false,
    }),
    makeField("text", {
      field: "role",
      title: "Role",
      extra: {
        placeholder: "Role (admin or member)",
      },
      hasError: (value) =>
        !["admin", "member"].includes(value)
          ? "Fill in admin or member"
          : false,
    }),
  ];

  return (
    <Layout container>
      <Form<{
        email: string;
        role: TeamRole;
      }>
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          if (!loginToken) return reject("Please login");
          const { role, email } = values;
          const { response, success } = await api("upsertTeamMember", "POST", {
            loginToken,
            teamId,
            teamMemberId: teamMember?.id,
            teamMember: { role, email },
          });
          if (success) {
            teams.refetch();
            resolve(response);
            navigation.goBack();
          } else {
            reject(response);
          }
        }}
      />
    </Layout>
  );
};

TeamMemberScreen.options = ({ route }: { route: any }) =>
  ({
    title: route.params?.teamMember?.user?.name || "New Team member",

    headerRight: () => {
      const [loginToken] = useStore("loginToken");
      const teams = useTeams();
      const navigation = useNavigation();
      const teamMemberId: number = route.params?.teamMember?.id;
      const teamId: number = route.params?.teamId;

      const deleteItem = async () => {
        if (loginToken && teamId && teamMemberId) {
          const deleteResult = await api("deleteTeamMember", "POST", {
            teamId,
            teamMemberId,
            loginToken,
          });
          if (deleteResult.success) {
            teams.refetch();
            navigation.goBack();
          }
        }
      };
      return teamId && teamMemberId ? (
        <RWNButton onClick={deleteItem}>
          <AntDesign name="delete" size={24} color="black" />
        </RWNButton>
      ) : null;
    },
  } as ScreenOptions);
