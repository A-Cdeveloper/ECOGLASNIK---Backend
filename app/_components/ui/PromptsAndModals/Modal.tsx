"use client";

import ReactDOM from "react-dom";

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
      <div className="bg-winter-100/80 text-primary-900 max-w-1/4 h-auto flex flex-col justify-center items-center p-4 rounded-md">
        <p>{message}</p>
        <div className="flex gap-x-2 mt-4">
          <button
            onClick={onClose} // Close the modal
            className="bg-winter-100/40 hover:bg-winter-100/50 text-primary-900 px-4 py-2 rounded-md"
          >
            Odustani
          </button>
          <button
            onClick={onConfirm} // Confirm the action
            className="bg-winter-100/40 hover:bg-winter-100/50 text-primary-900 px-4 py-2 rounded-md"
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>,
    document.body // This renders the modal into the body element
  );
};

export default Modal;
