import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChapterContentComponent } from './components/chapter-content/chapter-content.component';
import { ChaptersPageComponent } from './pages/chapters-page/chapters-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'chapters', component: ChaptersPageComponent,
        children: [
            { path: 'chapter/:id', component: ChapterContentComponent },
            { path: 'chapter/:id/question/:question', component: ChapterContentComponent }
        ]
    },


];
