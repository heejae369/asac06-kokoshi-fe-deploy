import { closeModal, ModalState } from "@/lib/slice/modalSlice";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import barImage from "@/assets/barImage.png";
import modalCss from "@/styles/modal.module.css";

type ModalContent = {
  children: ReactNode;
  w?: String;
};

export const Modal: React.FC<ModalContent> = ({ children, w = "294px" }) => {
  const modalBackground = useRef(null);
  const isShow = useSelector(
    (state: { modal: ModalState }) => state.modal.isShow
  );
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  if (!isShow) return null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={modalCss["modal-container"]}
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          close();
        }
      }}
    >
      <div className={modalCss["modal-content2"]}>
        <div
          className={
            "w-[360px] flex flex-col pb-8 px-5 text-[14px] font-semibold tracking-tighter"
          }
          // style={{ width: w }}
        >
          <div className="mt-[18px] flex justify-center">
            <Image src={barImage} width={77} height={3} alt="" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
