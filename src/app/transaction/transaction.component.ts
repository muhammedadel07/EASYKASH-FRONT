import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransactionApi } from './transaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  data: TransactionApi;
  sellerId: number;
  dateStart: number;
  dateEnd: number;
  perPage: number;
  page: number;

  private _url = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  private validData(): boolean {
    if (
      this.sellerId &&
      this.dateStart &&
      this.dateEnd &&
      this.perPage &&
      this.page
    )
      return true;
    return false;
  }

  private fetchDataFor(id: number): Observable<TransactionApi> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      page: this.page,
      per_page: this.perPage,
      date_range: `${this.dateStart}to${this.dateEnd}`,
      seller_id: id,
    });

    return this.http.get<TransactionApi>(this._url, {
      headers: { Authorization: 'Token ABC' },
      params: queryParams,
    });
  }

  onSearch() {
    this.data = null;
    if (this.validData()) {
      this.fetchDataFor(this.sellerId).subscribe((data) => (this.data = data));
    }
  }

  ngOnInit(): void {}
}
