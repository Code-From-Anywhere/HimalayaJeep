// import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { H2, P, PType } from "react-with-native";
// type TextType = DetailedHTMLProps<
//   HTMLAttributes<HTMLParagraphElement>,
//   HTMLParagraphElement
// >;

type Preset = "h1" | "h2" | "h3";

const presetStyles = {
  h1: "text-3xl",
  h2: "text-xl lg:text-2xl",
  h3: "text-xl",
};

const Element = ({ preset, children, ...props }: PType & { preset?: Preset }) =>
  preset === "h1" ? (
    <H2 {...props}>{children}</H2>
  ) : preset === "h2" ? (
    <H2 {...props}>{children}</H2>
  ) : preset === "h3" ? (
    <H2 {...props}>{children}</H2>
  ) : (
    <P {...props}>{children}</P>
  );

const Text = ({
  preset,
  children,
  className,
  ...rest
}: { preset?: Preset } & PType) => {
  const classNameWithPreset = `${preset ? presetStyles[preset] : ""} ${
    className || ""
  }`;
  return (
    <Element preset={preset} {...rest} className={classNameWithPreset}>
      {children}
    </Element>
  );
};

export default Text;
