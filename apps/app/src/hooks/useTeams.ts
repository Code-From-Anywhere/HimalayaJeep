import { api } from "ui";
import { useQuery } from "react-query";
import useStore from "../Store";

export const useTeams = () => {
  const [loginToken] = useStore("loginToken");
  return useQuery(["teams", loginToken], () => {
    if (loginToken) {
      return api("getMeTeams", "GET", { loginToken });
    }
  });
};
