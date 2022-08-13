/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, FC, CSSProperties } from "react";

const hiddenStyles: CSSProperties = {
  display: "inline-block",
  position: "absolute",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

type VisuallyHiddenType = {
  [x: string]: unknown;
  children: React.ReactNode;
};

const VisuallyHidden: FC<VisuallyHiddenType> = ({
  children,
  ...delegated
}): any => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Control") {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Control") {
          setForceShow(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }
  return (
    <span style={hiddenStyles} {...delegated}>
      {children}
    </span>
  );
};
export default VisuallyHidden;
