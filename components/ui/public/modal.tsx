import React from 'react';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600">
            취소
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm text-white bg-red-500 rounded-md">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;