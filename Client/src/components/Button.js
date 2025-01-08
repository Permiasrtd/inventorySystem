import styled from "styled-components";
import { ColorPicker } from "../theme";

const Button = styled.button`
  position: relative;
  display: flex;
  outline: none;
  border: none;
  font-size: 1em;
  padding: 0.5em;
  font-size: 1em;
  color: #ffffff;
  background-color: rgb(
    ${({ color }) => (color ? ColorPicker(color) : ColorPicker("primary"))}
  );

  border-radius: ${({ icon }) => (icon ? "100% " : "30px")};
  transition: all 0.3s;
  :hover {
    cursor: pointer;
    box-shadow: 0px 10px 20px -10px rgba(${({ color }) => (color ? ColorPicker(color) : ColorPicker("primary"))}, 0.5);
    transform: translateY(-2px);
  }
`;

export default Button;
