export const SideNavData = [
    {
        id: "account-button",
        name: "Account",
        class: true,
        subdata: [
            {
                name: "Dashboard",
                link: "/user",
                active:true
            },
            {
                name: "Statement",
                link: "/user/statement",
                active:true
            }
        ]
    },
    {
        id: "pay-button",
        name: "Pay & Transfer",
        class: true,
        subdata: [
            {
                "name": "Fund Transfer",
                "link": "/user/fund-transfer-page",
                active:true
            },
            {
                "name": "Favourites Transaction",
                "link": "/user/manager-favourites-page",
                active:true
            },
            {
                "name": "Add Beneficiary",
                "link": "/user/beneficiary-maintenance-page",
                active:true
            },

            {
                "name": "Manage Beneficiary",
                "link": "/user/manage-beneficiary",
                active:true
            }
        ]

    },
    {
        id: "Deposit-button",
        name: "Deposit",
        class: false,
        subdata: [
            {
                "name": "Deposit Summary",
                "link": "/user/deposit-summary",
                active:true
            },
            {
                "name": "Open New Term Deposit",
                "link": "/user/open-new-term-deposit",
                active:true
            },
            {
                "name": "Term Deposit(TD) Details",
                "link": "/user/term-deposit-details",
                active:true
            },
            {
                "name": "Print/Download TD Details",
                "link": "/user/print-download-td-details",
                active:true
            },
            {
                "name": "Close Term Deposit(TD) ",
                "link": "/user/close-term-deposit",
                active:true
            }

        ]

    },
    {
        id: "Loans-button",
        name: "Loans",
        class: true,
        subdata: [
            {
                "name": "Apply for Loan",
                "link": "/user/apply-for-loan",
                active:true
            },
            {
                "name": "Loan Summary",
                "link": "/user/loan-summary",
                active:true
            },
            {
                "name": "Agri Loan Service",
                "link": "/user/agri-loan-service",
                active:false
            },
            {
                "name": "Calculator",
                "link": "/user/calculator",
                active:false
            }
        ]

    },
    {
        id: "Cards-button",
        name: "Cards",
        class: true,
        subdata: [
            {
                "name": "New Debit Card",
                "link": "/user/new-debit-card",
                active:true
            },
            {
                "name": "Manage Debit Card",
                "link": "/user/manage-debit-card",
                active:true
            },
            {
                "name": "New Credit Card",
                "link": "/user/new-credit-card",
                active:true
            },
            {
                "name": "Manage Credit Card",
                "link": "/user/manage-credit-card",
                active:true
            },
            {
                "name": "Manage Prepaid Card",
                "link": "/user/manage-prepaid-card",
                active:false
            }
        ]

    },
    {
        id: "Bills-button",
        name: "Bills & Utilities",
        class: false,
        subdata: [
            {
                "name": "Bharat Bill System",
                "link": "/user/bharat-bill-system",
                active:true
            },
            {
                "name": "Bill Payment",
                "link": "/user/bill-payment",
                active:true
            },
            {
                "name": "ATM/Branch Locator",
                "link": "/user/atm-branch-locator",
                active:true
            }
        ]

    },
    {
        id: "other-button",
        name: "Other Services",
        class: false,
        subdata: [
            {
                "name": "Kisan Service",
                "link": "/user/kisan-service",
                active:true
            },
            {
                "name": "Update Email",
                "link": "/user/update-email",
                active:true
            },
            {
                "name": "Update Pan",
                "link": "/user/update-pan",
                active:true
            }
        ]

    },


]