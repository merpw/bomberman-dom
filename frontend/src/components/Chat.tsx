import { useAppDispatch, useAppSelector } from "#/store/hooks.ts";
import { FormEvent, useEffect } from "react";
import wsActions from "#/store/ws/actions.ts";
import { getName } from "#/helpers/getName.ts";

const Chat = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const username = getName();
    if (!username) return;

    dispatch(wsActions.connect({ username }));
  }, [dispatch]);

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
    <div className={"mx-1 my-2 grow overflow-y-scroll flex flex-col-reverse"}>
      {messages
        .slice()
        .reverse()
        .map((message, key) => (
          <div key={key}>
            <span className={"text-info" /* TODO: add different colors */}>
              {message.username}:{" "}
            </span>{" "}
            <span>{message.content}</span>
          </div>
        ))}
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

    const username = getName();
    if (!username) {
      return;
    }

    dispatch(wsActions.send.chatMessage(content));

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className={"flex flex-col gap-1"}>
      <input type="text" name={"content"} className={"input input-bordered"} />
      <button type="submit" className={"btn ml-auto"}>
        Send
      </button>
    </form>
  );
};

export default Chat;
