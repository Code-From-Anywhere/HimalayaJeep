import { Div, Label, P, Strong } from "react-with-native";
import { InputContainerProps } from "react-with-native-form";

export const getRenderInputContainer = ({ dark }: { dark?: boolean }) => {
  return ({
    children,
    startSection,
    sectionTitle,
    title,
    description,
    error,
    errorClassName,
  }: InputContainerProps) => (
    <Div>
      {startSection ? (
        <Div
          style={{
            display: "flex",
            height: 40,
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          {sectionTitle ? (
            <P>
              <Strong>{sectionTitle}</Strong>
            </P>
          ) : (
            <Div style={{ height: 40 }} />
          )}
        </Div>
      ) : null}

      {/* This is the section title */}
      <Div className="pt-0 mb-6">
        {title ? (
          <Label
            className={`mb-2 text-sm font-bold ${dark ? "text-white" : ""}`}
          >
            {title}
          </Label>
        ) : null}
        {description && (
          <Div className={`flex mx-3 mb-2 items-start `}>
            <P className={`text-gray-500 italic`}>{description}</P>
          </Div>
        )}
        {error ? (
          <P className={errorClassName || `mr-3 mb-2 text-red-500`}>
            {error || "Invalid value"}
          </P>
        ) : null}

        <Div>{children}</Div>
      </Div>
    </Div>
  );
};
