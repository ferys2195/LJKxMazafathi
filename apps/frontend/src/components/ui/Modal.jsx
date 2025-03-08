import React, { useEffect } from "react";

function Modal({ id, title, children, onClose }) {
  const closeModal = () => {
    document.getElementById(id)?.close(); // Menutup modal
  };
  useEffect(() => {
    if (onClose) closeModal();
  }, [onClose, id]);
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
      </div>
    </dialog>
  );
}

export default Modal;
