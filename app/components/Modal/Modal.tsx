import { DialogOverlay, DialogContent } from "@reach/dialog";
import React, { FC } from "react";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ showModal, children, setShowModal }) => {
  const handleDismiss = () => setShowModal(false);

  return (
    <>
      {showModal ? (
        <DialogOverlay
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 backdrop-opacity-10 bg-merchaint-text-dark-grey/40"
          onDismiss={handleDismiss}
        >
          <DialogContent aria-label="Modal">{children}</DialogContent>
        </DialogOverlay>
      ) : null}
    </>
  );
};

export default Modal;
