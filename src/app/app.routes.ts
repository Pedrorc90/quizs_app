import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChaptersPageComponent } from './chapters-page/chapters-page.component';
import { ChapterContentComponent } from './chapter-content/chapter-content.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'chapters', component: ChaptersPageComponent,
        children: [
            { path: 'chapter/:id', component: ChapterContentComponent }
        ]
    },


];
