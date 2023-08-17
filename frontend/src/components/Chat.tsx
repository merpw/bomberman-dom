import { useAppDispatch, useAppSelector } from "#/store/hooks.ts";
import { FC, FormEvent, useEffect } from "react";
import wsActions from "#/store/ws/actions.ts";
import { useUsername } from "#/helpers/name.ts";
import { ChatMessage } from "#/store/chats";
import useHeroColor from "#/components/game/heroes.ts";

const Chat = () => {
  const dispatch = useAppDispatch();
  const username = useUsername();

  useEffect(() => {
    if (!username) return;

    dispatch(wsActions.connect({ username }));
  }, [dispatch, username]);

  return (
    <div className={"mx-1 flex flex-col max-h-[90%]"}>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

const ChatMessages = () => {
  const messages = useAppSelector((state) => state.chats.messages);

  if (messages.length === 0) {
    return (
      <h1 className={"text-base-content text-sm text-center my-2"}>Chat</h1>
    );
  }

  return (
    <div className={"mx-1 my-2 grow overflow-y-auto flex flex-col-reverse"}>
      {messages
        .slice()
        .reverse()
        .map((message, key) => (
          <Message message={message} key={key} />
        ))}
    </div>
  );
};

const Message: FC<{ message: ChatMessage }> = ({ message }) => {
  const userColor = useHeroColor(message.username);
  return (
    <div className={"flex gap-1"}>
      {message.username && (
        <>
          <span
            className={"text-info"}
            style={{
              color: userColor,
            }}
          >
            {message.username}:
          </span>
        </>
      )}
      <span
        className={
          "break-all" +
          " " +
          (message.username ? "" : "mx-auto text-base-content")
        }
      >
        {message.content}
      </span>
    </div>
  );
};

const ChatInput = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const content = e.currentTarget.content.value as string;
    if (!content) {
      return;
    }

    dispatch(wsActions.send.chatMessage(content));

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className={"flex flex-col gap-1"}>
      <input
        type="text"
        name={"content"}
        className={"input input-bordered"}
        autoComplete={"off"}
      />
      <button type="submit" className={"btn ml-auto"}>
        Send
      </button>
    </form>
  );
};

export default Chat;
