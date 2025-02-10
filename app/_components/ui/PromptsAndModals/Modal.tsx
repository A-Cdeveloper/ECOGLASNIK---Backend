"use client";

import ReactDOM from "react-dom";
import Button from "../Buttons/Button";
import Headline from "../Headline";

type ModalType = {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const Modal = ({ onClose, onConfirm, message }: ModalType) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary-500/60 z-50"
      onClick={onClose}
    >
      <div className="bg-winter-100 text-primary-900 max-w-1/4 h-auto flex flex-col justify-center items-center p-4 rounded-md">
        <Headline level={3} className="!text-primary-900 !normal-case">
          {message}
        </Headline>
        <div className="flex gap-x-2 mt-4">
          <Button variation="info" onClick={onClose}>
            Odustani
          </Button>
          <Button onClick={onConfirm} variation="danger">
            Potvrdi
          </Button>
        </div>
      </div>
    </div>,
    document.body // This renders the modal into the body element
  );
};

export default Modal;
