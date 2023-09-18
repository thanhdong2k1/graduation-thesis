const DetailTable = ({ tableData, datas }) => {
    return (
        <div className="border rounded-lg relative min-w-full">
            <table className="min-w-full text-left text-h3FontSize media-max-md:text-smallFontSize font-normal relative">
                <thead className="font-medium dark:border-neutral-500">
                    <tr className={`border-b`}>
                        {tableData.map((table,index) => (
                            <th
                                scope="col"
                                className={`${index!=tableData.length-1?"border-r":""} text-ellipsis text-center whitespace-nowrap px-2 py-1 overflow-hidden`}
                            >
                                {table.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="relative">
                    {datas.map((data, indexData) => (
                        <tr className={`${indexData!=datas.length-1?"border-b":""} relative transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 `}>
                            {/* <td className="whitespace-nowrap px-2 py-1 font-medium">
                        {data.tableData[index].column}
                    </td> */}
                            {tableData.map((table, indexTable) =>
                                !table.actions ? (
                                    <td
                                        className={`${indexData!=datas.length?"border-r":""} whitespace-nowrap px-2 py-1 ${table?.width} ${table?.maxWidth} overflow-hidden text-ellipsis group`}
                                    >
                                        {data[table.column]}
                                        <span
                                            className={`hidden no-underline group-hover:block group-hover:absolute text-whiteColor bg-textColor shadow-lg p-1 z-10 rounded-lg text-smallestFontSize whitespace-break-spaces`}
                                        >
                                            {data[table.column]}
                                        </span>
                                    </td>
                                ) : (
                                    <td
                                        className={`actions flex justify-evenly items-center whitespace-nowrap px-2 py-1 relative`}
                                    >
                                        {table.actions.map((action) => (
                                            <span
                                                onClick={() => {
                                                    action.handle(data);
                                                }}
                                                className="overflow-hidden group "
                                            >
                                                {action.icon}
                                                <span
                                                    className={`hidden no-underline group-hover:block group-hover:absolute group-hover:-translate-x-[50%] text-whiteColor bg-textColor shadow-lg p-1 z-10 rounded-lg text-smallestFontSize`}
                                                >
                                                    {action.type}
                                                </span>
                                            </span>
                                        ))}
                                    </td>
                                )
                            )}
                            {/* <td className="whitespace-nowrap px-2 py-1">
                        Otto
                    </td>
                    <td className="whitespace-nowrap px-2 py-1">
                        @mdo
                    </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailTable;
