import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMainComponent } from './weather-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OpenWeatherMapService } from 'src/app/services/open-weather-map.service';
import { of, throwError } from 'rxjs';

export class OpenWeatherMapServiceMock {
  getWeatherForCity = jasmine.createSpy('getWeatherForCity').and.returnValue(
    of({
      lat: 40.712776,
      lon: -74.005974,
      timezone: 'America/New_York',
      current: {
        dt: 1618317040,
        sunrise: 1618282134,
        sunset: 1618333901,
        temp: 284.65,
        feels_like: 281.86,
        pressure: 1013,
        humidity: 93,
        dew_point: 283.15,
        uvi: 0,
        clouds: 90,
        visibility: 10000,
        wind_speed: 4.12,
        wind_deg: 250,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d',
          },
        ],
      },
      daily: [
        {
          dt: 1618308000,
          sunrise: 1618282134,
          sunset: 1618333901,
          temp: {
            day: 284.65,
            min: 283.15,
            max: 285.93,
            night: 284.15,
            eve: 284.15,
            morn: 283.15,
          },
          feels_like: {
            day: 281.86,
            night: 282.15,
            eve: 282.15,
            morn: 282.15,
          },
          pressure: 1013,
          humidity: 93,
          dew_point: 283.15,
          wind_speed: 4.12,
          wind_deg: 250,
          weather: [
            {
              id: 501,
              main: 'Rain',
              description: 'moderate rain',
              icon: '10d',
            },
          ],
          clouds: 90,
          pop: 0.89,
          uvi: 3.42,
        },
      ],
    })
  );
}

export class ToastrServiceMock {
  error = jasmine.createSpy('error');
  success = jasmine.createSpy('success');
}

describe('WeatherMainComponent', () => {
  let component: WeatherMainComponent;
  let fixture: ComponentFixture<WeatherMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [WeatherMainComponent],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: OpenWeatherMapService, useClass: OpenWeatherMapServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getWeatherForCity with correct params on submit', () => {
    const openWeatherMapService = fixture.debugElement.injector.get(
      OpenWeatherMapService
    );
    component.askForWeatherForm.controls['cityName'].setValue('Sydney');
    component.askForWeatherForm.controls['units'].setValue('metric');
    component.onSubmit();
    expect(openWeatherMapService.getWeatherForCity).toHaveBeenCalledWith(
      'Sydney',
      'metric'
    );
  });

  it('should show error message if weather data fetching fails', () => {
    const openWeatherMapService: OpenWeatherMapService = TestBed.inject(
      OpenWeatherMapService
    );

    (openWeatherMapService.getWeatherForCity as jasmine.Spy).and.returnValue(
      throwError(() => new Error('Failed to fetch weather data'))
    );

    const toastrService: ToastrService = TestBed.inject(ToastrService);

    component.askForWeatherForm.controls['cityName'].setValue('Unknown');
    component.onSubmit();

    expect(toastrService.error).toHaveBeenCalledWith(
      'Failed to fetch weather data',
      'Error, try correct city name'
    );
  });
});
