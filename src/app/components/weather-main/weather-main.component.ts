import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { OpenWeatherMapService } from 'src/app/services/open-weather-map.service';
import { WeatherData } from '../../models/weatherdata.model';
import { AskWeatherFormModel } from '../../models/ask-weather-form.model';

@Component({
  selector: 'cw-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMainComponent implements OnInit, OnDestroy {
  public askForWeatherForm!: FormGroup;
  public weatherData: WeatherData | null = null;
  private weatherDataSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private openWeatherMapService: OpenWeatherMapService
  ) {}

  ngOnInit(): void {
    this.createFrom();
  }

  ngOnDestroy(): void {
    if (this.weatherDataSubscription) {
      this.weatherDataSubscription.unsubscribe();
    }
  }

  private createFrom(): void {
    this.askForWeatherForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      units: ['metric', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.askForWeatherForm.valid) {
      const params = this.askForWeatherForm.value as AskWeatherFormModel;

      if (this.weatherDataSubscription) {
        this.weatherDataSubscription.unsubscribe();
      }
      this.weatherDataSubscription = this.openWeatherMapService
        //
        //
        .getWeatherForCity(params.cityName, params.units)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.weatherData = data;
            this.cdr.markForCheck();
          },
          error: (error) => {
            this.toastr.error(error.message, 'Error, try correct city name');
            this.weatherData = null;
          },
        });
    }
  }
}
