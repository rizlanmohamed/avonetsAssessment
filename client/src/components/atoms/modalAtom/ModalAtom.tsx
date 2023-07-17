import { Modal } from "antd";
import { useEffect, useState } from "react";
import "./ModalAtom.scss";

export type ModalAtomProps = {
  isModalPopUp: boolean;
  modalHeading: string;
  modalBody: React.ReactNode;
  modalOnOk: (val:any) => void;
  modalOnCancel: () => void;
  modalButtonName?: string;
  modalImage: string;
};

function ModalAtom({
  isModalPopUp,
  modalHeading,
  modalBody,
  modalOnOk,
  modalOnCancel,
  modalButtonName,
  modalImage,
}: ModalAtomProps) {
  const [modal1Open, setModal1Open] = useState(false);

  useEffect(() => {
    setModal1Open(isModalPopUp);
  }, [isModalPopUp]);

  return (
    <>
      <Modal
        title={modalHeading}
        style={{
          top: 20,
        }}
        visible={modal1Open}
        onOk={modalOnOk}
        okText={modalButtonName}
        onCancel={modalOnCancel}
        width={1000}
        centered
      >
        <div className="modal-container">
          <div className="modal-body">{modalBody && modalBody}</div>
              <img
                src={modalImage}
                alt="side image"
                className="modal-image-element"
              />
        </div>
      </Modal>
    </>
  );
}

export default ModalAtom;
