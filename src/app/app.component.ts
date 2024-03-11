import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'yw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Your Weather';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
