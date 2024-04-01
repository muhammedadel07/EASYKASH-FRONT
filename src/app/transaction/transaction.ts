interface Paging {
  total: number;
  current_page: number;
  per_page: number;
}

interface Transaction {
  id: number;
  title: string;
  image: string;
  price: number;
  last_updated: string;
}

export interface TransactionApi {
  data: {
    transactions: Transaction[];
    paging: Paging;
  };
}
