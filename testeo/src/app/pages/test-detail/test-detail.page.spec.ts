import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDetailPage } from './test-detail.page';

describe('TestDetailPage', () => {
  let component: TestDetailPage;
  let fixture: ComponentFixture<TestDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
