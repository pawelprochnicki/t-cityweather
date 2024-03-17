import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './services/apikey.interceptor';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { WeatherMainComponent } from './components/weather-main/weather-main.component';

@NgModule({
  declarations: [AppComponent, HeaderBarComponent, FooterBarComponent, WeatherMainComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
