import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ChapterContentComponent } from "../chapter-content/chapter-content.component";
import { RouterOutlet } from '@angular/router';
import { ChapterMeta } from '../model/chapter.meta';
import { ChapterService } from '../services/chapter.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    ChapterContentComponent,
    RouterOutlet
  ]
})
export class NavComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  chapters: ChapterMeta[] = []

  constructor(private chapterService: ChapterService) { }

  ngOnInit(): void {
    this.chapterService.getChaptersMeta().subscribe((resp: any) => {
      this.chapters = resp.chapters;
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}


