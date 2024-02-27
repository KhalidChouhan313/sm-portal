import { Component } from '@angular/core';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent {
  currentServiceType = "sms";
  setServiceType = (value: string) => this.currentServiceType = value;
}
