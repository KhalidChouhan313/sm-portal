import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {}

@NgModule({
  imports: [CommonModule, LoaderComponent], 
  exports: [LoaderComponent],
})
export class LoaderModule {}
