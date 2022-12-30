import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";

interface SimplePopupProps {
  open: boolean;
  message: string;
  closeButtonText?: string;
  onClose: () => any;
}

const SimplePopup: React.FC<SimplePopupProps> = ({
  open,
  message,
  onClose,
  closeButtonText = "OK",
}) => {
  return (
    <StyledPopup
      open={open}
      closeOnDocumentClick
      closeOnEscape
      onClose={onClose}
    >
      <MsgText>{message}</MsgText>
      <Button onClick={onClose}>
        <ButtonText>{closeButtonText}</ButtonText>
      </Button>
    </StyledPopup>
  );
};

export default SimplePopup;

const StyledPopup = styled(Popup)`
  &-content {
    border-width: 0;
    max-width: 15%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    border: 0.1em solid ${({ theme }) => theme.colors.text};
    border-radius: 1.5em;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 1em;
  }
`;

const MsgText = styled.p`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.text};
  display: flex;
  flex: 2;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 0.8em;
  cursor: pointer;
  border-radius: 0.5em;
  justify-content: center;
  display: flex;
  flex: 1;
  width: 40%;
`;

const ButtonText = styled.span`
  color: ${({ theme }) => theme.colors.background};
  font-size: 1em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  font-weight: bold;
  display: flex;
`;
