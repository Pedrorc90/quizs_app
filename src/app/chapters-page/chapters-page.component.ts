import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { ChapterContentComponent } from "../chapter-content/chapter-content.component";
import { ChapterService } from '../services/chapter.service';
import { ChapterMeta } from '../model/chapter.meta';
@Component({
  selector: 'app-chapters-page',
  standalone: true,
  imports: [NavComponent, RouterOutlet, ChapterContentComponent],
  templateUrl: './chapters-page.component.html',
  styleUrl: './chapters-page.component.css'
})
export class ChaptersPageComponent {



}
