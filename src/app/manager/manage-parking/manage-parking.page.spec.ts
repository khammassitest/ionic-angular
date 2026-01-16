import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageParkingPage } from './manage-parking.page';

describe('ManageParkingPage', () => {
  let component: ManageParkingPage;
  let fixture: ComponentFixture<ManageParkingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageParkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
