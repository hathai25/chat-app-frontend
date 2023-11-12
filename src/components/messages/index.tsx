import { ActionIcon, Grid, Group, Stack } from "@mantine/core";
import { MessageHeader } from "@/components/messages/header.tsx";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { useGetConversation } from "@/server/hooks/useGetConversation.ts";
import { MessageEditor } from "../editor";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { MessageList } from "@/components/messages/list.tsx";

export const Message = (props: { conversationID: string }) => {
  const { conversationID } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const self = useGetMe();

  const conversation = useGetConversation({ id: conversationID });
  const form = useForm({
    initialValues: { message: "" },
  });

  return (
    <Stack m={0} p={0}>
      {conversation.isError && <div>error</div>}
      {conversation.isLoading && <Loader />}
      {conversation.isSuccess && self.isSuccess && (
        <>
          <Group m={0} p={0} grow>
            <MessageHeader
              conversationDetail={conversation.data}
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
              userID={self.data.userId}
            />
          </Group>
          <Stack>
            <MessageList
              userID={self.data.userId}
              conversationID={conversationID}
            />
            <form onSubmit={form.onSubmit(console.log)}>
              <Grid gutter={0} align="center" columns={24}>
                <Grid.Col span={23}>
                  <MessageEditor form={form} />
                </Grid.Col>
                <Grid.Col span={1}>
                  <Group position="right">
                    <ActionIcon size="xl" variant="gradient" type="submit">
                      <IconSend />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};
