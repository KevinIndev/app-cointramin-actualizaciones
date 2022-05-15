import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInformationsComponent } from './job-informations.component';

describe('JobInformationsComponent', () => {
  let component: JobInformationsComponent;
  let fixture: ComponentFixture<JobInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
