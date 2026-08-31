import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemCar } from './collection-item-car';

describe('CollectionItemCar', () => {
  let component: CollectionItemCar;
  let fixture: ComponentFixture<CollectionItemCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionItemCar],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionItemCar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
