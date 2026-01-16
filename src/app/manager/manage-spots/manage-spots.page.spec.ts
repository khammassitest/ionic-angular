import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSpotsPage } from './manage-spots.page';

describe('ManageSpotsPage', () => {
  let component: ManageSpotsPage;
  let fixture: ComponentFixture<ManageSpotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
