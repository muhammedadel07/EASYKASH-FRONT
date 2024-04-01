interface Seller {
  date: string;
  total_income: number;
  seller_name: string;
  seller_id: string;
}

export interface SellerApi {
  data: {
    days: Seller[];
  };
}

export interface LineChartItem {
  name: string;
  value: number;
}

export interface LineChartData {
  name: string;
  series: LineChartItem[];
}
