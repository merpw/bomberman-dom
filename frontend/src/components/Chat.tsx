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
    <div>
      <h1>Chat</h1>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

const ChatMessages = () => {
  const messages = useAppSelector((state) => state.chats.messages);

  return (
    <div>
      {messages.map((message, key) => (
        <div key={key}>
          <p>
            {message.username}: {message.content}
          </p>
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

    const username = getName();
    if (!username) {
      return;
    }

    dispatch(wsActions.send.chatMessage(content));

    form.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name={"content"} />
      <button type="submit">Send</button>
    </form>
  );
};

export default Chat;
