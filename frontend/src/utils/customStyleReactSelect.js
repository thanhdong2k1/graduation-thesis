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
        backgroundColor: "#fff",
    }),
    valueContainer: (base) => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: "0px 8px",
    }),
    option: (base, state) => ({
        ...base,
        // borderBottom: '1px dotted pink',
        // color: state?.isSelected ? 'red' : 'blue',
        padding: "4px 8px",
        fontWeight: "500",
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

export const customSelectStylesMulti = {
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
        backgroundColor: "#fff",
    }),
    valueContainer: (base) => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: "0px 8px",
    }),
    option: (base, state) => ({
        ...base,
        // borderBottom: '1px dotted pink',
        // color: state?.isSelected ? 'red' : 'blue',
        padding: "4px 8px",
        fontWeight: "500",
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
    multiValueRemove: (base, state) => {
        return state?.data?.isFixed ? { ...base, display: "none" } : base;
    },
    multiValue: (base, state) => {
        return state?.data?.isFixed
            ? { ...base, backgroundColor: "#6b7280", borderRadius: "0.5rem" }
            : { ...base, backgroundColor: "#eeeff1", borderRadius: "0.5rem" };
    },
    multiValueLabel: (base, state) => {
        return state?.data?.isFixed
            ? {
                  ...base,
                  fontWeight: "600",
                  color: "white",
                  paddingRight: 6,
              }
            : {
                  ...base,
                  fontWeight: "600",
                  color: "#686868",
                  paddingRight: 6,
              };
    },
    multiValueRemove: (base, state) => {
        return state?.data?.isFixed
            ? { ...base, display: "none" }
            : {
                  ...base,
                  color: "#686868",
                  ":hover": {
                      backgroundColor: "#6b7280",
                      color: "white",
                      borderRadius: "0 0.5rem 0.5rem 0"
                  },
              };
    },
};
