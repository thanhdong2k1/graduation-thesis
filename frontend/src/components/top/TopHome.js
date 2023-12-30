import logoMini from "../../assets/logo_Mini.png";
import background2 from "../../assets/background2.png";
import background1 from "../../assets/background1-min.png";


const TopHome = () => {

    return (
        <div className="topDiv flex justify-between items-center w-full relative left-0 right-0 top-0 bg-gradient-to-tr from-purple-400 to-green-600">
            <div className="logoDiv flex relative h-[150px] media-max-lg:h-[90px] w-full justify-center items-center">
                <img
                    src={background2}
                    alt="Image Background"
                    className="backgroundImg absolute mix-blend-overlay object-cover w-full h-full"
                />
                <img
                    src={background1}
                    alt="Image Background"
                    className="schoolImg absolute top-0 right-0 mix-blend-lighten object-cover w-[40%] h-full opacity-90 media-max-md:hidden"
                />
            </div>
            <div className="headerDiv absolute flex items-center w-full">
                <div className="imageDiv flex basis-1/4 justify-center">
                    <img
                        src={logoMini}
                        alt="Image Logo"
                        className="w-[100px] h-[100px] media-max-lg:w-[60px] media-max-lg:h-[60px] bg-paleBlue p-1 rounded-2xl m-4 cursor-pointer"
                    />
                </div>
                <div className="textDiv basis-3/4 font-bold media-max-lg:font-semibold">
                    <div className="text-biggestFontSize media-max-lg:text-h3FontSize media-max-sm:text-smallFontSize">
                        PHÂN HIỆU TRƯỜNG ĐẠI HỌC THỦY LỢI
                    </div>
                    <div className="text-h2FontSize media-max-lg:text-smallestFontSize whitespace-nowrap overflow-hidden">
                        HỆ THỐNG QUẢN LÝ LUẬN VĂN TỐT NGHIỆP
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHome;
