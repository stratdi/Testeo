import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFavoritesPage } from './test-favorites.page';

describe('Tab3Page', () => {
  let component: TestFavoritesPage;
  let fixture: ComponentFixture<TestFavoritesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestFavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
