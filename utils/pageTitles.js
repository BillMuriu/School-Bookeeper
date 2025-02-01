// utils/pageTitles.js

export const pageTitles = {
  "/": "Dashboard",
  "/operations": "All Operations Files",
  "/operations/books": "Books",
  "/operations/money-received/view-receipt": "Operations - All Receipts",
  "/operations/money-received/add-receipt": "Operations - Add Receipt",

  "/operations/payment-vouchers": "Operations All Payments",
  "/operations/payment-vouchers/add-paymentvoucher": "Operations - Add Payment",

  "/operations/petty-cash": "Operations All PettyCashs",
  "/operations/petty-cash/add-pettycash": "Operations - Add PettyCash",

  "/operations/bank-charges": "Operations All BankCharges",
  "/operations/bank-charges/add-bankcharge": "Operations - Add BankCharge",

  "/operations/ledgers": "Ledgers",
  "/students": "Students List",

  // RMI Account Pages
  "/RMI": "RMI Account",
  "/RMI/money-received": "RMI Money Received",
  "/RMI/money-received/add-receipt": "RMI - Add Receipt",
  "/RMI/payment-vouchers": "RMI Payment Vouchers",
  "/RMI/payment-vouchers/add-paymentvoucher": "RMI - Add Payment",
  "/RMI/petty-cash": "RMI Petty Cash",
  "/RMI/petty-cash/add-pettycash": "RMI - Add PettyCash",
  "/RMI/bank-charges": "RMI Bank Charges",
  "/RMI/bank-charges/add-bankcharge": "RMI - Add BankCharge",

  // Tuition Account Pages
  "/tuition": "Tuition Account",
  "/tuition/money-received": "Tuition Money Received",
  "/tuition/money-received/add-receipt": "Tuition - Add Receipt",
  "/tuition/payment-vouchers": "Tuition Payment Vouchers",
  "/tuition/payment-vouchers/add-paymentvoucher": "Tuition - Add Payment",
  "/tuition/petty-cash": "Tuition Petty Cash",
  "/tuition/petty-cash/add-pettycash": "Tuition - Add PettyCash",
  "/tuition/bank-charges": "Tuition Bank Charges",
  "/tuition/bank-charges/add-bankcharge": "Tuition - Add BankCharge",
};

export const dynamicRoutes = [
  {
    pattern: /^\/operations\/money-received\/view-receipt\/(\d+)$/,
    getTitle: (id) => `Operations - Receipt #${id}`,
  },
  {
    pattern: /^\/operations\/payment-vouchers\/view-paymentvoucher\/(\d+)$/,
    getTitle: (id) => `Operation - PaymentVoucher #${id}`,
  },
  {
    pattern: /^\/operations\/petty-cash\/view-pettycash\/(\d+)$/,
    getTitle: (id) => `Operations - PettyCash #${id}`,
  },

  // RMI Dynamic Routes
  {
    pattern: /^\/RMI\/money-received\/view-receipt\/(\d+)$/,
    getTitle: (id) => `RMI - Receipt #${id}`,
  },
  {
    pattern: /^\/RMI\/payment-vouchers\/view-paymentvoucher\/(\d+)$/,
    getTitle: (id) => `RMI - PaymentVoucher #${id}`,
  },
  {
    pattern: /^\/RMI\/petty-cash\/view-pettycash\/(\d+)$/,
    getTitle: (id) => `RMI - PettyCash #${id}`,
  },

  // Tuition Dynamic Routes
  {
    pattern: /^\/tuition\/money-received\/view-receipt\/(\d+)$/,
    getTitle: (id) => `Tuition - Receipt #${id}`,
  },
  {
    pattern: /^\/tuition\/payment-vouchers\/view-paymentvoucher\/(\d+)$/,
    getTitle: (id) => `Tuition - PaymentVoucher #${id}`,
  },
  {
    pattern: /^\/tuition\/petty-cash\/view-pettycash\/(\d+)$/,
    getTitle: (id) => `Tuition - PettyCash #${id}`,
  },
];
