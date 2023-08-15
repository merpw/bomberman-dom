import { FC, FormEventHandler } from "react";
import { navigate } from "vite-plugin-ssr/client/router";

const NameForm: FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const inputName = new FormData(e.currentTarget).get("name");
    if (!inputName) {
      return;
    }
    localStorage.setItem("name", inputName.toString());
    navigate("/game");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Choose your name</h1>
      <input type="text" name={"name"} placeholder="Enter your name" required />
    </form>
  );
};

export default NameForm;
