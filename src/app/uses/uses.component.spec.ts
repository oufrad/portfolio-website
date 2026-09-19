import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UsesComponent } from './uses.component';

describe('UsesComponent', () => {
  let component: UsesComponent;
  let fixture: ComponentFixture<UsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsesComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
