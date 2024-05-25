import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {
  data: any;
  updateCount = 0;
  subscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = interval(5000).pipe(
      switchMap(() => {
        console.log('Fetching data...');
        return this.dataService.getData();
      })
    ).subscribe(response => {
      this.data = response;
      this.updateCount++;
      console.log('Data fetched at: ', new Date()); // اضافه کردن لاگ زمان دریافت داده‌ها
    });

    // برای اولین بار اطلاعات را بدون تأخیر بگیرید
    this.fetchData();
  }

  fetchData() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.updateCount++;
      console.log('Initial data fetched at: ', new Date()); // اضافه کردن لاگ زمان دریافت داده‌ها
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
