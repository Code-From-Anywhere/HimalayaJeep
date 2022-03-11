import { DataPointEntryType, PersonType } from "core";
import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Div } from "react-with-native";
import { Image } from "react-native";
import { Button as RWNButton } from "react-with-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const Entry = ({ entry }: { entry: DataPointEntryType }) => {
  return (
    <Div className="bg-gray-400 rounded-full py-2 px-6">
      {`${entry.dataPoint?.label}: ${entry.value}`}
    </Div>
  );
};
export const PersonScreen = ({ route }: { route: any }) => {
  const person: PersonType = route.params.person;

  return (
    <Layout>
      {person.picture ? (
        <Image
          //  width={"100%"}
          //  src={person.picture}
          {...{
            width: "100%",
            height: 300,
            source: { uri: person.picture },
          }}
        />
      ) : null}
      <Div>
        {[
          { label: "Name", value: person.name },
          { label: "Email", value: person.email },
          { label: "Phone", value: person.phone },
          { label: "Premium", value: person.isPremium ? "Yes" : "No" },
          { label: "Location", value: person.location },
          { label: "Tagline", value: person.tagline },
          { label: "Last update", value: person.updatedAt },
        ]
          .filter((x) => !!x.value)
          .map((dataPoint, index) => {
            return (
              <Div
                key={`datapoint${index}`}
                className="flex flex-row justify-between items-center border-b-gray-300 border-b h-16 pl-4 pr-6"
              >
                <Div className="mr-4">{dataPoint.label}</Div>
                <Div className="flex flex-1" textClassName="text-right">
                  {dataPoint.value}
                </Div>
              </Div>
            );
          })}

        <Div className="flex flex-row flex-wrap">
          {person.entries?.map((entry) => {
            return <Entry entry={entry} />;
          })}
        </Div>
      </Div>
    </Layout>
  );
};

PersonScreen.options = (({ route }) => {
  const person: PersonType = route.params.person;
  return {
    title: person.name,

    headerRight: () => {
      const show = async () => {
        Linking.openURL(`https://linkedin.com/in/${person.profilePath}`);
      };
      return person.profilePath ? (
        <RWNButton onClick={show}>
          <Ionicons name="open-outline" size={24} color="black" />
        </RWNButton>
      ) : null;
    },
  };
}) as ScreenOptions;
