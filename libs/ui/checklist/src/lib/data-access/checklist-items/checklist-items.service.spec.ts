import { TestBed } from '@angular/core/testing';

import { ChecklistItemsService } from './checklist-items.service';

describe('ChecklistItemsService', () => {
  let service: ChecklistItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
