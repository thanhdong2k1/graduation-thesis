export const targetHeight = 35;
export const customSelectStyles = {
    // .input {
    //     @apply appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-greyText font-medium leading-tight;
    // }
    // .input:focus {
    //     @apply outline-none border-HoverColor shadow-md shadow-paleBlue;
    // }
    control: (base) => ({
        ...base,
        minHeight: targetHeight,
        height: targetHeight,
        borderRadius: "0.5rem",
        border: "1px solid #79797c",
        fontWeight: "500",
    }),
    valueContainer: (base) => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: "0px 8px",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#686868",
    }),
    clearIndicator: (base) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
};
