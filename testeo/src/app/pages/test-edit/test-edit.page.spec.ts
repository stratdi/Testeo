import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFormPage } from './test-edit.page';

describe('TestFormPage', () => {
  let component: TestFormPage;
  let fixture: ComponentFixture<TestFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
