import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDisplayComponent } from './weather-display.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherData } from 'src/app/models/weatherdata.model';

describe('WeatherDisplayComponent', () => {
  let component: WeatherDisplayComponent;
  let fixture: ComponentFixture<WeatherDisplayComponent>;
  const mockWeatherDataMetric: WeatherData = {
    lat: 0,
    lon: 0,
    timezone: 'Europe/Warsaw',
    current: {
      dt: 1600000000,
      sunrise: 1600000000,
      sunset: 1600001000,
      temp: 15,
      feels_like: 14,
      pressure: 1012,
      humidity: 55,
      dew_point: 10,
      uvi: 5,
      clouds: 10,
      visibility: 10000,
      wind_speed: 5,
      wind_deg: 180,
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
    },
    daily: [],
  };

  const mockWeatherDataImperial: WeatherData = {
    ...mockWeatherDataMetric,
    current: { ...mockWeatherDataMetric.current, temp: 59, wind_speed: 3.1 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherDisplayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the weather data in metric units', () => {
    component.weatherData = mockWeatherDataMetric;
    component.units = 'metric';
    fixture.detectChanges();

    const tempElement: HTMLElement = fixture.nativeElement.querySelector(
      '.cw-weather-params__item--value span'
    );
    expect(tempElement.textContent).toContain('15°C');
  });

  it('should correctly render the weather data in imperial units', () => {
    component.weatherData = mockWeatherDataImperial;
    component.units = 'imperial';
    fixture.detectChanges();

    const tempElement: HTMLElement = fixture.nativeElement.querySelector(
      '.cw-weather-params__item--value span'
    );
    expect(tempElement.textContent).toContain('59°F');
  });

  it('should not render the component without weather data', () => {
    component.weatherData = null; // Brak danych pogodowych
    fixture.detectChanges();

    const weatherElement: HTMLElement =
      fixture.nativeElement.querySelector('.cw-weather');
    expect(weatherElement).toBeNull();
  });
});
