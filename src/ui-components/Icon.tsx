import styled from "@emotion/styled";
import * as mdIcons from "react-icons/md";
import * as siIcons from "react-icons/si";

const icons = {
  ...mdIcons,
  ...siIcons
};

interface IconProps {
  name: string;
  size?: string;
  color?: string;
  className?: string;
}

const Icon = ({
  name,
  className,
}: IconProps) => {
  if (!name || !icons[name]) {
    return <div />;
  }

  const Element = icons[name];

  return <Element className={className} />;
};

export default Icon;
