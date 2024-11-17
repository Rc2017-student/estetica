import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuprincipalPage } from './menuprincipal.page';

describe('MenuprincipalPage', () => {
  let component: MenuprincipalPage;
  let fixture: ComponentFixture<MenuprincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuprincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
