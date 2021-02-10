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
  inverse?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  onClick = () => {},
  to,
  history,
  children,
  invisible = false,
  inverse = false,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const handleClick = () => {
    if (to) {
      return history.push(to);
    }

    onClick();
  };

  // TODO: classes
  let classes = [
    "flex",
    "items-center",
    "justify-center",
    "font-medium",
    "rounded",
    "uppercase",
    "tracking-widest",
    "p-3",

    "transition-all",
    "duration-300",
    "focus:outline-none",
  ];

  if (disabled) {
    classes = classes.concat([
      "text-indigo-300",
      "bg-indigo-100",
      "hover:bg-indigo-100",
      "w-40",
      "h-12",
      "cursor-not-allowed",
    ]);
  } else {
    if (!invisible) {
      classes = classes.concat(["w-40", "h-12"]);

      if (inverse) {
        classes = classes.concat([
          "text-indigo-700",
          "bg-indigo-50",
          "hover:bg-indigo-100",
        ]);
      } else {
        classes = classes.concat([
          "text-indigo-50",
          "bg-indigo-700",
          "hover:bg-indigo-600",
        ]);
      }
    } else {
      if (inverse) {
        classes = classes.concat(["text-indigo-900"]);
      } else {
        classes = classes.concat(["text-indigo-50"]);
      }
    }
  }

  return (
    <button
      className={classes.join(" ")}
      {...stripNonDOMProps(props)}
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? (
        <BeatLoader
          css={css`
            position: relative;
            top: 1px;
          `}
          color={inverse ? "#312E81" : "#EEF2FF"}
          size={10}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default withRouter(Button);
