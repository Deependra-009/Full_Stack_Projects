export interface UserEntity {
  user_id?: String;
  active?: String;
  role?: String;
  account_holder_name?: String;
  account_holder_address?: String;
  account_holder_city?: String;
  account_holder_state?: String;
  account_holder_country?: String;
  account_holder_pincode?: String;
  account_holder_phone_no?: String;
  account_holder_email?: String;
  account_holder_dob?: String;
  account_holder_gender?: String;
  account_holder_aadhar_no?: String;
  account_holder_pan_no?: String;
  account_holder_photo?: String;
  account_holder_marital_status?: String;
  account_holder_religion?: String;
  account_holder_category?: String;
  account_holder_occupation?: String;
  account_holder_qualification?: String;
  account_holder_staff_of_bank?: String;
  account_holder_residency_status?: String;
  account_holder_gross_income?: String;
  accountdata?: {
    account_table_id?: String;
    customer_id?: String;
    account_number?: String;
    account_ifsccode?: String;
    account_type?: String;
    account_balance?: String;
    account_total_loan?: String;
    account_opening_date?: String;
  };
  statementEntityList?: [];
  debitCardEntityList?: [];
  creditCardEntityList?: [];
  chart_data?: {
    yearlyData?: [];
    expenseData?: [];
  };
}
