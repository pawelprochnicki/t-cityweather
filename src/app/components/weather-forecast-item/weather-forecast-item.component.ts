import { Component, Input, OnInit } from '@angular/core';
import { ForecastData } from '../../models/forecast-data.model';
@Component({
  selector: 'cw-weather-forecast-item',
  templateUrl: './weather-forecast-item.component.html',
  styleUrls: ['./weather-forecast-item.component.scss'],
})
export class WeatherForecastItemComponent implements OnInit {
  @Input() forecast: any | null = null;
  @Input() units: string | null = null;

  constructor() {}

  ngOnInit(): void {}
}
