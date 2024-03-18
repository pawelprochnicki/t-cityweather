import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../models/weatherdata.model';

@Component({
  selector: 'cw-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
})
export class WeatherDisplayComponent implements OnInit {
  @Input() weatherData: WeatherData | null = null;

  constructor() {}

  ngOnInit(): void {}
}
