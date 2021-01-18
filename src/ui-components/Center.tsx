import { css } from "@emotion/css";

const Center = ({ children, column }: { children: any; column?: boolean }) => (
  <div
    className={css`
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      ${column && "flex-direction: column;"}
    `}
  >
    {children}
  </div>
);

export default Center;
