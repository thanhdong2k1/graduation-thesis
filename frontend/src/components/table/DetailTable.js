import { useSelector } from "react-redux";

const DetailTable = ({ tableData, datas }) => {
    const isFetching = useSelector((state) => state.user.isFetching);
    const error = useSelector((state) => state.user.error);
    console.log("datas", datas, isFetching, error);
    datas.map((data) => {
        tableData?.map((table, indexTable) => {
            console.log("data, table", data, typeof data[table?.column] === 'object'?data[table?.column]?.valueVi:data[table?.column]);
        });
    });
    return (
        <div className="border rounded-lg relative min-w-full">
            <table className="min-w-full text-left text-normalFontSize media-max-md:text-smallFontSize font-medium relative">
                <thead className="font-medium">
                    <tr className={`border-b`}>
                        {tableData?.map(
                            (table, index) =>
                                !table?.hide && (
                                    <th
                                        scope="col"
                                        className={`${
                                            index != tableData.length - 1
                                                ? "border-r"
                                                : ""
                                        } text-ellipsis text-center whitespace-nowrap px-2 py-1 overflow-hidden`}
                                    >
                                        {table?.header}
                                    </th>
                                )
                        )}
                    </tr>
                </thead>
                <tbody className="relative">
                    {datas.length > 0 ? (
                        datas?.map((data, indexData) => (
                            <tr
                                className={`${
                                    indexData != datas.length - 1
                                        ? "border-b"
                                        : ""
                                } relative transition duration-300 ease-in-out hover:bg-neutral-100`}
                            >
                                {/* <td className="whitespace-nowrap px-2 py-1 font-medium">
                        {data.tableData[index].column}
                    </td> */}
                                {tableData?.map(
                                    (table, indexTable) =>
                                        !table?.hide &&
                                        (!table?.actions ? (
                                            <td
                                                className={`${
                                                    indexData != datas.length
                                                        ? "border-r"
                                                        : ""
                                                } whitespace-nowrap px-2 py-1 ${
                                                    table?.width
                                                } ${
                                                    table?.maxWidth
                                                } overflow-hidden text-ellipsis group`}
                                            >
                                                {typeof data[table?.column] === 'object'?data[table?.column]?.valueVi?data[table?.column]?.valueVi:data[table?.column]?.name:data[table?.column]}
                                                {/* {typeof data[table?.column] === 'object'?data[table?.column]?.name:null}
                                                {typeof data[table?.column] !== 'object'?data[table?.column]:null} */}

                                                {/* {data[table?.column]} */}
                                                {table.tooltip && (
                                                    <span
                                                        className={`hidden no-underline group-hover:block group-hover:absolute -translate-y-[200%] text-whiteColor bg-textColor shadow-lg p-1 z-10 rounded-lg text-smallestFontSize whitespace-break-spaces`}
                                                    >
                                                        {/* {data[table?.column]} */}
                                                    </span>
                                                )}
                                            </td>
                                        ) : (
                                            <td
                                                className={`actions flex justify-evenly items-center whitespace-nowrap px-2 py-1 relative`}
                                            >
                                                {table?.actions?.map(
                                                    (action) => (
                                                        <span
                                                            onClick={() => {
                                                                action.handle(
                                                                    data
                                                                );
                                                            }}
                                                            className="overflow-hidden group "
                                                        >
                                                            {action.icon}
                                                            {/* {table.tooltip&&( */}
                                                            <span
                                                                className={`hidden no-underline group-hover:block group-hover:absolute -translate-x-[50%] -translate-y-[170%] text-whiteColor bg-textColor shadow-lg p-1 z-10 rounded-lg text-smallestFontSize`}
                                                            >
                                                                {action.type}
                                                            </span>
                                                            {/* )} */}
                                                        </span>
                                                    )
                                                )}
                                            </td>
                                        ))
                                )}
                                {/* <td className="whitespace-nowrap px-2 py-1">
                        Otto
                    </td>
                    <td className="whitespace-nowrap px-2 py-1">
                        @mdo
                    </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={tableData.length}
                                className="text-center text-h3FontSize font-medium"
                            >
                                {isFetching ? (
                                    <>
                                        <svg
                                            aria-hidden="true"
                                            role="status"
                                            class="inline mr-3 w-4 h-4 text-PrimaryColor animate-spin"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="#E5E7EB"
                                            ></path>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                        <span>Loading...</span>
                                    </>
                                ) : error ? (
                                    <>
                                        <span>
                                            Có lỗi, kiểm tra kết nối mạng và thử
                                            lại sau
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>Dữ liệu trống</span>
                                    </>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DetailTable;