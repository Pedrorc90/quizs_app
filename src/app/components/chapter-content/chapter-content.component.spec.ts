import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterContentComponent } from './chapter-content.component';

describe('ChapterContentComponent', () => {
  let component: ChapterContentComponent;
  let fixture: ComponentFixture<ChapterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
