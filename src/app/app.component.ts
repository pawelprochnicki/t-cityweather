import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'City Weather';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
