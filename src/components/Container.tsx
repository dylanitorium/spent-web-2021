import { useAuth } from "contexts/auth";
import { Button } from "ui-components";

const Container = ({ children, dark = false }) => {
  const { user, signout } = useAuth();

  return (
    <div
      className={`min-h-screen flex ${
        dark ? "bg-indigo-900" : "bg-indigo-50"
      } flex-col`}
    >
      <div className="flex flex-grow">{children}</div>
    </div>
  );
};

export default Container;
