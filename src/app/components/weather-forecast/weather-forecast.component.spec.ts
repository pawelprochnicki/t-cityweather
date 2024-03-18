import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecastComponent } from './weather-forecast.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    component.weatherData = {
      lat: 0,
      lon: 0,
      timezone: 'UTC',
      current: {
        dt: 1618317040,
        sunrise: 1618282134,
        sunset: 1618333901,
        temp: 284.15,
        feels_like: 281.86,
        pressure: 1009,
        humidity: 87,
        dew_point: 281.86,
        uvi: 0.89,
        clouds: 90,
        visibility: 10000,
        wind_speed: 4.12,
        wind_deg: 300,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
      },
      daily: [],
    };
    component.units = 'metric';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display forecast data when available', () => {
    const containerElement = fixture.debugElement.query(
      By.css('.cw-forecast-container')
    );
    expect(containerElement).toBeTruthy();
  });

  it('should not display forecast data when weatherData is null', () => {
    component.weatherData = null;
    fixture.detectChanges();

    const forecastContainer = fixture.debugElement.query(
      By.css('.cw-forecast-container')
    );
    expect(forecastContainer).toBeNull();
  });

  it('should handle undefined weatherData gracefully', () => {
    component.weatherData = null;
    fixture.detectChanges();

    const forecastContainer = fixture.debugElement.query(
      By.css('.cw-forecast-container')
    );
    expect(forecastContainer).toBeNull();
  });
});
