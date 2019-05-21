import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStatisticsComponent } from './current-statistics.component';

describe('CurrentStatisticsComponent', () => {
  let component: CurrentStatisticsComponent;
  let fixture: ComponentFixture<CurrentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
