import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCreatePage } from './test-create.page';

describe('Tab2Page', () => {
  let component: TestCreatePage;
  let fixture: ComponentFixture<TestCreatePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
