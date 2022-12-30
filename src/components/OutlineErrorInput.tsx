import React from "react";
import styled from "styled-components";
import { Field, FieldAttributes } from "formik";

interface OutlineErrorInputProps extends FieldAttributes<any> {
  showOutline?: any;
  style?: { [key: string]: any };
}

const OutlineErrorInput: React.FC<OutlineErrorInputProps> = ({
  showOutline,
  style,
  ...props
}) => {
  const curStyle = showOutline ? { ...style, border: "2px solid red" } : style;

  return <Input {...props} style={curStyle} />;
};

export default OutlineErrorInput;

const Input = styled(Field)`
  font-size: 1em;
  padding: 0.6em;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fontFamily.text};
  color: black;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.text};
  margin-right: 2em;
  width: 100%;
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.text};
  }
`;
