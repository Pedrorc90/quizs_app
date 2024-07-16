import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import { ChapterMeta } from '../model/chapter.meta';
import { Answer } from '../model/answer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  baseUrl: string = environment.baseUrl;

  assetsPath: string = '/assets/';
  assetsChapterPath: string = '/assets/chapter_';;
  extFile: string = '.json';

  constructor(private http: HttpClient) { }

  getChaptersMeta(): Observable<ChapterMeta[]> {
    return this.http.get<ChapterMeta[]>(this.baseUrl + this.assetsPath + 'chapters.meta' + this.extFile);
  }

  getQuestions(chapterNumber: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl + this.assetsChapterPath + chapterNumber + '/chapter_' + chapterNumber + this.extFile)
  }

  getAnswers(chapterNumber: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.baseUrl + this.assetsChapterPath + chapterNumber + '/answers_chapter_' + chapterNumber + this.extFile)
  }


}
