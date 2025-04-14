import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelSceneComponent } from './duel-scene.component';

describe('DuelSceneComponent', () => {
  let component: DuelSceneComponent;
  let fixture: ComponentFixture<DuelSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelSceneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuelSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
