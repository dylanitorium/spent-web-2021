import { css } from "@emotion/react";
import { withRouter } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";

const stripNonDOMProps = ({ staticContext, ...props }: any) => props;

type ButtonProps = {
  onClick?: Function;
  to?: string;
  history: any;
  children: any;
  invisible?: boolean;
  compact?: boolean;
  loading?: boolean
};

const Button = ({
  onClick = () => {},
  to,
  history,
  children,
  invisible = false,
  compact = false,
  loading = false,
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
    : compact
    ? "text-white bg-black rounded uppercase text-sm tracking-widest transition-all hover:bg-gray-800 py-1 px-2"
    : "text-white bg-black rounded uppercase text-sm tracking-widest p-3 w-72 h-12 transition-all hover:bg-gray-800";

  return (
    <button
      className={className}
      {...stripNonDOMProps(props)}
      onClick={handleClick}
    >
      {loading ? <BeatLoader css={css`position: relative; top: 1px`}color="white" size={10} /> : children}
    </button>
  );
};

export default withRouter(Button);
