import Icon from "./Icon";

const FlashMessage = ({ children, type = "info" }) => {
  const color = (() => {
    switch (type) {
      case "info":
        return "blue";
      case "success":
        return "green";
      case "warning":
        return "yellow";
      case "danger":
        return "red";
      default:
        return "grey";
    }
  })();

  const icon = (() => {
    switch (type) {
      case "info":
        return "MdInfo";
      case "success":
        return "MdCheckCircle";
      case "warning":
        return "MdWarning";
      case "danger":
        return "MdWarning";
      default:
        return "grey";
    }
  })();

  return (
    <div
      className={`bg-${color}-100 text-${color}-500 border-${color}-500  border-l-4 px-6 py-6 flex items-center`}
    >
      <Icon name={icon} className="text-3xl" />
      <div className="ml-4">{children}</div>
    </div>
  );
};

export default FlashMessage;
