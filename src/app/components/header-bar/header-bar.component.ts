import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cw-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  @Input() title: string = '';
  constructor() {}

  ngOnInit(): void {}
}
