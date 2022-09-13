export default interface TransactionFinalQuery {
  acc_number: string;
  amount: string;
  transactions: {
    label: string;
    amount: string;
    currency: string;
  }[];
}
