import React from "react";

const ModalPopup = ({
    children,
    showModal,
    setShowModal,
    title,
    result,
    setResult,
}) => {
    const handleSave = async () => {
        setResult && setResult(result);
        setShowModal(false);
      // console.log(result);
    };
    const handleClose = async () => {
        setShowModal(false);
    };
    return (
        <>
            {showModal ? (
                <div className="flex justify-center items-center">
                    <div className="opacity-100 fixed inset-0 z-40 w-[100%] flex justify-center items-center">
                        <div className="modalPopupDiv flex justify-center items-center z-50 w-screen opacity-100 overflow-x-auto">
                            <div className="w-full">
                                <div className="p-2">
                                    <div className="relative w-auto my-6 mx-auto max-w-max">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    {title}
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {children && (
                                                <div className="relative p-6 flex-auto w-full">
                                                    {children}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-PrimaryColor background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleClose}
                                                >
                                                    Đóng
                                                </button>
                                                <button
                                                    className="buttonPrimary"
                                                    type="button"
                                                    onClick={handleSave}
                                                >
                                                    Xác nhận
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-10 bg-black w-screen"></div>
                </div>
            ) : null}
        </>
    );
};
export default ModalPopup;
