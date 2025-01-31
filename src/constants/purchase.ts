export const purchasesStatus = {
    inCart: -1,
    all: 0,
    waitForConfirmation: 1,
    waitForGetting: 2,
    inProgress: 3,
    delivered: 4,
    canceled: 5,
} as const;

export const purchaseTabs = [
    { status: purchasesStatus.all, name: 'Tất cả' },
    { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
    { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
    { status: purchasesStatus.inProgress, name: 'Đang giao' },
    { status: purchasesStatus.canceled, name: 'Đã hủy' },
    { status: purchasesStatus.delivered, name: 'Đã giao' },
];
