export const getStockStatus = (quantity) => {
    return quantity > 0 ? 'in-stock' : 'out-of-stock';
};

export const STOCK_STATUS_CLASS_MAP = {
    'in-stock': 'bg-green-500',
    'out-of-stock': 'bg-red-500'
};

export const STOCK_TEXT_CLASS_MAP = {
    'in-stock': null,      // we’ll show number instead of text
    'out-of-stock': 'Out of Stock'
};

export const formatPKR = (value) => {
    const amount = Number(value);

    if (isNaN(amount)) return "0"; // if the value is not a number

    return amount.toLocaleString("en-PK", {
        minimumFractionDigits: 0,
    });
};