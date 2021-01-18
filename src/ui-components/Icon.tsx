import styled from "@emotion/styled";
import * as icons from "react-icons/md";

interface IconProps {
  name: string;
  size?: string;
  color?: string;
  className?: string;
}

const Icon = ({
  name,
  size = "24px",
  color = "#fff",
  className,
}: IconProps) => {
  if (!name || !icons[`Md${name}`]) {
    return <div />;
  }

  const Element = styled(icons[`Md${name}`])`
    font-size: ${size};
    color: ${color};
  `;

  return <Element className={className} />;
};

export default Icon;
