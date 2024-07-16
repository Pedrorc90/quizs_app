import { Component, Input } from '@angular/core';
import { Chapter } from '../../model/chapter';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()
  chapter!: Chapter;

}
