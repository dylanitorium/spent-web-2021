import { withRouter } from "react-router";

const stripNonDOMProps = ({ staticContext, ...props }: any) =>  props;

type ButtonProps = {
  onClick?: Function;
  to?: string;
  history: any;
  children: any;
  invisible: boolean;
};

const Button = ({
  onClick = () => {},
  to,
  history,
  children,
  invisible = false,
  ...props
}: ButtonProps) => {
  const handleClick = () => {
    if (to) {
      return history.push(to);
    }

    onClick();
  };

  const className = invisible
    ? ""
    : "text-white bg-black rounded uppercase text-sm tracking-widest py-3 px-3 w-72 transition-all hover:bg-gray-800";

  return (
    <button className={className} {...stripNonDOMProps(props)} onClick={handleClick}>
      {children}
    </button>
  );
};

export default withRouter(Button);
