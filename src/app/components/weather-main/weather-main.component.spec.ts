import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMainComponent } from './weather-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OpenWeatherMapService } from 'src/app/services/open-weather-map.service';
import { Observable, of, throwError } from 'rxjs';

describe('WeatherMainComponent', () => {
  let component: WeatherMainComponent;
  let fixture: ComponentFixture<WeatherMainComponent>;
  let mockOpenWeatherMapService: {
    getWeatherForCity: {
      and: {
        returnValue: (
          arg0: Observable<{
            lat: number;
            lon: number;
            timezone: string;
            current: {
              dt: number;
              sunrise: number;
              sunset: number;
              temp: number;
              feels_like: number;
              pressure: number;
              humidity: number;
              dew_point: number;
              uvi: number;
              clouds: number;
              visibility: number;
              wind_speed: number;
              wind_deg: number;
              weather: {
                id: number;
                main: string;
                description: string;
                icon: string;
              }[];
            };
            daily: {
              dt: number;
              sunrise: number;
              sunset: number;
              temp: {
                day: number;
                min: number;
                max: number;
                night: number;
                eve: number;
                morn: number;
              };
              feels_like: {
                day: number;
                night: number;
                eve: number;
                morn: number;
              };
              pressure: number;
              humidity: number;
              dew_point: number;
              wind_speed: number;
              wind_deg: number;
              weather: {
                id: number;
                main: string;
                description: string;
                icon: string;
              }[];
              clouds: number;
              pop: number;
              uvi: number;
            }[];
          }>
        ) => void;
      };
      calls: { any: () => any };
    };
  };
  let mockToastrService: { error: any };

  beforeEach(async () => {
    mockOpenWeatherMapService = jasmine.createSpyObj('OpenWeatherMapService', [
      'getWeatherForCity',
    ]);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['error']);

    await TestBed.configureTestingModule({
      declarations: [WeatherMainComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: OpenWeatherMapService, useValue: mockOpenWeatherMapService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.askForWeatherForm.valid).toBeFalsy();
  });

  it('should call getWeatherForCity and update weatherData on valid form submission', () => {
    const mockWeatherData = {
      lat: 51.5074,
      lon: 4.8936,
      timezone: 'Europe/Amsterdam',
      current: {
        dt: 1618317040,
        sunrise: 1618282134,
        sunset: 1618333901,
        temp: 20,
        feels_like: 19,
        pressure: 1012,
        humidity: 81,
        dew_point: 10,
        uvi: 0.89,
        clouds: 0,
        visibility: 10000,
        wind_speed: 4.12,
        wind_deg: 250,
        weather: [
          { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
        ],
      },
      daily: [
        {
          dt: 1618308000,
          sunrise: 1618282134,
          sunset: 1618333901,
          temp: {
            day: 20,
            min: 7,
            max: 20,
            night: 12,
            eve: 18,
            morn: 8,
          },
          feels_like: {
            day: 19,
            night: 11,
            eve: 17,
            morn: 6,
          },
          pressure: 1012,
          humidity: 81,
          dew_point: 10,
          wind_speed: 4.12,
          wind_deg: 250,
          weather: [
            { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
          ],
          clouds: 0,
          pop: 0,
          uvi: 0.89,
        },
      ],
    };

    mockOpenWeatherMapService.getWeatherForCity.and.returnValue(
      of(mockWeatherData)
    );

    component.askForWeatherForm.controls['cityName'].setValue('Amsterdam');
    component.askForWeatherForm.controls['units'].setValue('metric');
    component.onSubmit();

    expect(mockOpenWeatherMapService.getWeatherForCity).toHaveBeenCalledWith(
      'Amsterdam',
      'metric'
    );
    expect(component.weatherData).toEqual(mockWeatherData);
  });

  it('should display error when getWeatherForCity service returns an error', () => {
    const errorResponse = new Error('Service error');
    mockOpenWeatherMapService.getWeatherForCity.and.returnValue(
      throwError(() => errorResponse)
    );

    component.askForWeatherForm.controls['cityName'].setValue('Unknown');
    component.onSubmit();

    expect(mockOpenWeatherMapService.getWeatherForCity.calls.any()).toBeTrue();
    expect(mockToastrService.error).toHaveBeenCalledWith(
      errorResponse.message,
      'Error, try correct city name'
    );
    expect(component.weatherData).toBeNull();
  });
});
