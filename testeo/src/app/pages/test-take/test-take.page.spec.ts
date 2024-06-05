import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestTakePage } from './test-take.page';

describe('TestTakePage', () => {
  let component: TestTakePage;
  let fixture: ComponentFixture<TestTakePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
