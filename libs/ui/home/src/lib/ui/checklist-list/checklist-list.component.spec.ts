import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistListComponent } from './checklist-list.component';

describe('ChecklistListComponent', () => {
  let component: ChecklistListComponent;
  let fixture: ComponentFixture<ChecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
