import styles from "./Input.module.scss";

import React, { HTMLInputTypeAttribute, useState } from "react";
import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "search";
}

export const Input: React.VFC<IInputProps> = React.memo((props) => {
  const { className, type = "text", ...inputProps } = props;

  return <input className={clsx(className, styles.root)} type={type} {...inputProps} />;
});
