import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../models/weatherdata.model';

@Component({
  selector: 'cw-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  @Input() weatherData: WeatherData | null = null;
  @Input() units: string | null = null;

  constructor() {}

  ngOnInit(): void {}
}
