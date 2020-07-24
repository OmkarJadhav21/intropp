import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDropComponent } from './ai-drop.component';

describe('AiDropComponent', () => {
  let component: AiDropComponent;
  let fixture: ComponentFixture<AiDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
