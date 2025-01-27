import React from "react";
import styled from "styled-components"; //npm install

const CustomCheckbox = ({
  className,
  checked,
  size = "1rem",
  onChange,
  ...props
}) => (
  <CheckBoxContainer className={className}>
    <HiddenCheckBox
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
    <StyledCheckBox checked={checked} size={size}>
      <Icon viewBox="0 0 24 24" size={size}>
        <polyline points="19 7 10 17 5 12" />
      </Icon>
    </StyledCheckBox>
  </CheckBoxContainer>
);

const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0); /* Hides the checkbox */
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #8728ff;
  stroke-width: 2.5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => `calc(${props.size} * 0.75)`};
  height: ${(props) => `calc(${props.size} * 0.75)`};
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  border: ${(props) =>
    props.checked ? "solid 2px #8728ff" : "solid 2px #CCCCCC"};
  background: ${(props) => (props.checked ? "white" : "white")};
  border-radius: 50%;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  transition: all 150ms;
  position: relative;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export default CustomCheckbox;
