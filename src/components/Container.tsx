import { useAuth } from "contexts/auth";
import { Button } from "ui-components";

const Container = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-200 flex-col">
      {user && (
        <div className="flex justify-end p-4">
          <Button compact onClick={signout}>
            Sign out
          </Button>
        </div>
      )}
      <div className="flex bg-gray-200 flex-grow">{children}</div>
    </div>
  );
};

export default Container;
