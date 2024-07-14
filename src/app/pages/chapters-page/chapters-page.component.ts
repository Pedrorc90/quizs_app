import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChapterContentComponent } from '../../components/chapter-content/chapter-content.component';
import { NavComponent } from '../../components/nav/nav.component';
@Component({
  selector: 'app-chapters-page',
  standalone: true,
  imports: [NavComponent, RouterOutlet, ChapterContentComponent],
  templateUrl: './chapters-page.component.html',
  styleUrl: './chapters-page.component.css'
})
export class ChaptersPageComponent {



}
