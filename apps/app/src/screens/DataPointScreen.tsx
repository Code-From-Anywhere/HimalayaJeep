import { DataPointType, DataPointScope, DataPointTypeType } from "core";
import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { api } from "ui";
import useStore from "../Store";

export const DataPointScreen = ({ route }: { route: any }) => {
  const dataPoint: DataPointType | undefined = route.params?.dataPoint;

  const [loginToken] = useStore("loginToken");
  const fields = [
    makeField("text", {
      field: "label",
      title: "Label",
      extra: {
        placeholder: "Label",
      },
      hasError: (value) => (!value ? "Fill in a label" : false),
    }),
    makeField("text", {
      field: "description",
      title: "Description",
      extra: {
        placeholder: "Description",
      },
      hasError: (value) => (!value ? "Fill in a description" : false),
    }),

    makeField("toggle", {
      field: "multiple",
      title: "Multiple possible?",
    }),

    makeField("text", {
      field: "scope",
      title: "Scope",
    }),
    makeField("text", {
      field: "type",
      title: "Type",
    }),
    makeField("text", {
      field: "teamId",
      title: "teamId",
    }),
  ];

  return (
    <Layout container scroll>
      <Form<{
        description: string;
        label: string;
        multiple: boolean;
        scope: DataPointScope;
        teamId: number | null;
        type: DataPointTypeType;
        enum: string;
      }>
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          if (!loginToken) return reject("Please login");

          const { response, success } = await api("upsertDataPoint", "POST", {
            loginToken,
            id: dataPoint?.id,
            dataPoint: values,
          });
          if (success) {
            resolve(response);
          } else {
            reject(response);
          }
        }}
        initialValues={dataPoint}
      />
    </Layout>
  );
};

DataPointScreen.options = ({ route }: { route: any }) =>
  ({
    title: route.params?.dataPoint?.title || "New Datapoint",
  } as ScreenOptions);
