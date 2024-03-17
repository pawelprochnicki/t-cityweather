import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiKeyInterceptor } from "./apikey.interceptor";

describe('ApiKeyInterceptor', () => {
  let interceptor: ApiKeyInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiKeyInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiKeyInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(ApiKeyInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add an API key to requests to the specified URL', () => {
    const testUrl = environment.urlOpenWeatherMap;
    const apiKey = environment.openWeatherMapApiKey;

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(req => req.url.includes(testUrl) && req.params.has('appid'));
    expect(httpRequest.request.params.get('appid')).toEqual(apiKey);
    httpRequest.flush({ data: 'test' });
  });

  it('should not add an API key to requests to other URLs', () => {
    const otherUrl = 'http://example.com';

    httpClient.get(otherUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(req => req.url.includes(otherUrl));
    expect(httpRequest.request.params.has('appid')).toBeFalse();
    httpRequest.flush({ data: 'test' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
