import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { LineChartData, LineChartItem, SellerApi } from './seller';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  dateStart: number;
  sellerId: number;
  dateEnd: number;

  data: SellerApi;

  // chart
  // name = date
  // value = amount

  view: any[] = [800, 300];
  multi: LineChartData[];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'date';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454'],
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private _url = 'http://localhost:3000/sellers/transactions-summary';

  constructor(private http: HttpClient) {}

  private validData(): boolean {
    if (this.dateStart && this.sellerId && this.dateEnd) {
      return true;
    }
    return false;
  }

  private fetchDataFor(id: number): Observable<SellerApi> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      seller_id: this.sellerId,
      date_range: `${this.dateStart}to${this.dateEnd}`,
    });

    return this.http.get<SellerApi>(this._url, {
      headers: { Authorization: 'Token ABC' },
      params: queryParams,
    });
  }

  onSearch() {
    if (this.validData()) {
      this.fetchDataFor(this.sellerId).subscribe((data) => {
        if (data.data.days.length > 0) {
          const series: LineChartItem[] = [];
          data.data.days.forEach((item) => {
            series.push({
              name: item.date,
              value: item.total_income,
            });
          });
          this.multi = [
            {
              name: data.data.days[0].seller_name,
              series: series,
            },
          ];
        }
      });
    }
  }

  ngOnInit(): void {}
}
