import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { OpenWeatherMapService } from './open-weather-map.service';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        OpenWeatherMapService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    });
    service = TestBed.inject(OpenWeatherMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected weather data for Amsterdam (HttpClient called once)', (done: DoneFn) => {
    const expectedGeolocation = [{ lat: 52.3676, lon: 4.9041 }];
    const expectedWeatherData = { temp: 15, description: 'Cloudy' };

    httpClientSpy.get.and.returnValues(of(expectedGeolocation), of(expectedWeatherData));

    service.getWeatherForCity('Amsterdam', 'metric').subscribe({
      next: weatherData => {
        // @ts-ignore
        expect(weatherData).toEqual(expectedWeatherData, 'expected weather for Amsterdam');
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls to HttpClient');
  });

  it('should handle the error when geolocation fetch fails', (done: DoneFn) => {
    const errorResponse = new ErrorEvent('Network error');

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.getWeatherForCity('Unknown', 'metric').subscribe({
      next: () => done.fail('expected an error, not weather'),
      error: error => {
        expect(toastrServiceSpy.error.calls.count()).toBe(1, 'one call to toastr.error');
        expect(error).toContain('Something went wrong in getGeolocation');
        done();
      }
    });
  });
});
