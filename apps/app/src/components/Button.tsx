import { Div } from "react-with-native";
import { Button as RWNButton } from "react-with-native";
const Button = ({ onClick, title }: { onClick: () => void; title: string }) => {
  return (
    <RWNButton
      onClick={onClick}
      className="items-center p-2 bg-green-400 rounded-lg"
    >
      {title}
    </RWNButton>
  );
};

export default Button;
