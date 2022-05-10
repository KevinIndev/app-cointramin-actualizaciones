import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAssociateComponent } from './details-associate.component';

describe('DetailsAssociateComponent', () => {
  let component: DetailsAssociateComponent;
  let fixture: ComponentFixture<DetailsAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
