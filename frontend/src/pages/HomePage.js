const HomePage = () => {
    return (
        <>
            <div className="notifyDiv relative flex px-8 py-8 bg-whiteColor rounded-lg shadow-lg w-[60%] media-max-lg:w-[90%]">
                <div className="titleDiv absolute bg-gradient-to-r left-[50%] -translate-x-[50%] from-HoverColor via-PrimaryColor to-HoverColor py-2 rounded-lg -top-4 w-[70%] media-max-lg:w-[90%] text-center shadow-lg text-whiteColor font-semibold text-h2FontSize">
                    Thông báo
                </div>
                <div className="listitemsDiv relative top-4 flex flex-col gap-2 w-full font-medium text-justify">
                    <div className="itemDiv flex items-start media-min-lg:items-center media-max-lg:flex-col media-min-lg:gap-4 rounded-lg">
                        <div className="timeItem flex items-center px-4 py-2 bg-HoverColor rounded-lg text-whiteColor media-min-lg:flex-col media-max-lg:gap-2">
                            <div>
                                {new Date(1692412715 * 1000).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </div>
                            <div>
                                {new Date(1692412715 * 1000).toLocaleTimeString(
                                    "vi-VN"
                                )}
                            </div>
                        </div>
                        <div className="titleItem px-4 py-2">
                            <span>
                                Thông báo mở hội đồng {"Hội đồng 001"} bảo vệ
                                luận văn {"Niên khóa 2023-2024"}.
                            </span>
                        </div>
                    </div>
                    <div className="itemDiv flex items-start media-min-lg:items-center media-max-lg:flex-col media-min-lg:gap-4 rounded-lg">
                        <div className="timeItem flex items-center px-4 py-2 bg-HoverColor rounded-lg text-whiteColor media-min-lg:flex-col media-max-lg:gap-2">
                            <div>
                                {new Date(1692412715 * 1000).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </div>
                            <div>
                                {new Date(1692412715 * 1000).toLocaleTimeString(
                                    "vi-VN"
                                )}
                            </div>
                        </div>
                        <div className="titleItem px-4 py-2">
                            Thông báo mở hội đồng {"Hội đồng 001"}.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
