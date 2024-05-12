import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListPage } from './test-list.page';

describe('Tab1Page', () => {
  let component: TestListPage;
  let fixture: ComponentFixture<TestListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
