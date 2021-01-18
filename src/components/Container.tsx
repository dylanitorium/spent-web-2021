const Container = ({ children }) => (
  <div className="min-h-screen flex bg-gray-200 flex-col">
    <div className="flex bg-gray-200 flex-grow">{children}</div>
  </div>
);

export default Container;
