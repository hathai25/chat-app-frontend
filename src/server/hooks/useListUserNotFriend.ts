import { useQuery } from "@tanstack/react-query";
import { USER_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export const useListUserNotFriend = (props: { userID: string }) => {
  const { userID } = props;
  return useQuery({
    queryKey: ["get-all-not-friend-users"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(USER_API.GET_NOT_FRIEND, {
        params: {
          id: userID,
        },
      });
      return data.data.data;
    },
  });
};