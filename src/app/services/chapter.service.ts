import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../model/question';
import { ChapterMeta } from '../model/chapter.meta';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  getQuestions(chapterNumber: string): Observable<Question[]> {
    return this.http.get<Question[]>('/assets/chapter_' + chapterNumber + '/chapter_' + chapterNumber + '.json')
  }


  getChaptersMeta(): Observable<ChapterMeta[]> {
    return this.http.get<ChapterMeta[]>('/assets/chapters.meta.json');
  }
}
