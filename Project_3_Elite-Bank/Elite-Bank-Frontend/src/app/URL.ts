const hostname="localhost";
const port="8081";
const UserController=`http://${hostname}:${port}/api/v1/user`;
const StatementController=`http://${hostname}:${port}/api/v1/statement`;
const BeneficiaryController=`http://${hostname}:${port}/api/v1/beneficiary`;
const FundTransferController=`http://${hostname}:${port}/api/v1/transfer`;
const DebitCardController=`http://${hostname}:${port}/api/v1/debit-card`;
const CreditCardController=`http://${hostname}:${port}/api/v1/credit-card`;
const ManageFavouriteController=`http://${hostname}:${port}/api/v1/favourite`;
const LoanAccountController=`http://${hostname}:${port}/api/v1/loan`;

export {
    UserController,
    StatementController,
    BeneficiaryController,
    FundTransferController,
    DebitCardController,
    CreditCardController,
    ManageFavouriteController,
    LoanAccountController
};