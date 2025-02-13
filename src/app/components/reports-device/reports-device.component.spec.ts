import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDeviceComponent } from './reports-device.component';

describe('ReportsDeviceComponent', () => {
  let component: ReportsDeviceComponent;
  let fixture: ComponentFixture<ReportsDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsDeviceComponent]
    });
    fixture = TestBed.createComponent(ReportsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
