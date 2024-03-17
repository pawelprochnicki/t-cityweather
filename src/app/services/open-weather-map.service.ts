import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { GeocodingResponse } from '../models/geocoding-response.model';
import { WeatherData } from '../models/weatherdata.model';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherMapService {
  private urlOpenWeatherMap = environment.urlOpenWeatherMap;
  private baseUrlGeoCoding = `http://${this.urlOpenWeatherMap}/geo/1.0/direct`;
  private baseUrlWeather = `https://${this.urlOpenWeatherMap}/data/3.0/onecall`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private getGeolocation(cityName: string): Observable<GeocodingResponse[]> {
    const url = `${this.baseUrlGeoCoding}?q=${cityName}&limit=1`;

    return this.http.get<GeocodingResponse[]>(url).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Error');
        return throwError('Something went wrong in getGeolocation');
      })
    );
  }

  private getWeather(
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Observable<WeatherData> {
    const url = `${this.baseUrlWeather}?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly,alerts`;
    return this.http.get<WeatherData>(url).pipe(
      catchError((error) => {
        this.toastr.error(error.message, 'Error');
        return throwError('Something went wrong in getWeather');
      })
    );
  }

  public getWeatherForCity(
    cityName: string,
    units: string
  ): Observable<WeatherData> {
    return this.getGeolocation(cityName).pipe(
      switchMap((geolocationData: GeocodingResponse[]) => {
        const { lat, lon } = geolocationData[0];
        return this.getWeather(lat, lon, units);
      })
    );
  }
}
