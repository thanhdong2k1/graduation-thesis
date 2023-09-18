export const targetHeight = 25;
export const customStyles = {
    control: (base) => ({
        ...base,
        minHeight: targetHeight,
        height: targetHeight,
        borderRadius: "0.5rem",
    }),
    valueContainer: (base) => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: "0px 8px",
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
