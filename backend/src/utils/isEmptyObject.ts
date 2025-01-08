const isEmptyObject = (obj: object) => {
    if (!obj || typeof obj === "undefined") return true;

    return Object.keys(obj).length === 0;
};

export default isEmptyObject;