import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OpenWeatherMapService } from 'src/app/services/open-weather-map.service';

@Component({
  selector: 'cw-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss'],
})
export class WeatherMainComponent implements OnInit {
  constructor(
    private openWeatherMapService: OpenWeatherMapService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.openWeatherMapService
      .getWeatherForCity('4567', 'metric')
      .pipe(
        catchError((error) => {
          this.toastr.error(error, 'Error');
          console.error('Error in WeatherMainComponent:', error);
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
  }
}
