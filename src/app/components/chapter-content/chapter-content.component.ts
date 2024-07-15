import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chapter } from '../../model/chapter';
import { Question } from '../../model/question';
import { ChapterService } from '../../services/chapter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { Answer } from '../../model/answer';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LineBreakPipe } from "../../pipes/line-break.pipe";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    LineBreakPipe
  ],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent implements OnInit {

  baseUrl = environment.baseUrl;

  answersValues: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  chapter: Chapter = { chapterNumber: 0, title: "", score: 0, currentQuestion: 0 };

  currentQuestionContent!: Question;
  currentAnswerContent!: Answer;

  currentRadioOption: number = -1;
  currentCheckBoxSelectedOption: boolean[] = new Array().fill(false);

  responses: number[] = [];
  score: number = 0;

  colorQuestionList: number[] = new Array().fill(0);

  showExplanation: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterService) {
  }

  ngOnInit(): void {
    this.loadFromLS();
    this.fillChapterNumber();
    this.fillTitle();
    this.populateQuestions();
    this.populateAnswers();
  }

  loadFromLS() {
    this.score = localStorage.getItem("score") ? Number(localStorage.getItem("score")) : 0;
    this.colorQuestionList = localStorage.getItem("responses") ? JSON.parse(localStorage.getItem("responses") || "") : [];

  }

  fillChapterNumber() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.chapter.chapterNumber = params["id"];
      this.chapter.currentQuestion = params["question"] ? Number(params["question"] - 1) : 0;
    });
  }

  fillTitle() {
    this.chapterService.getChaptersMeta().subscribe((res: any) => {
      this.chapter.title = res.chapters[this.chapter.chapterNumber - 1].title;
    });
  }

  populateQuestions() {
    this.chapterService.getQuestions(this.chapter.chapterNumber.toString()).subscribe((resp: any) => {
      this.chapter.questions = resp.questions;
      this.currentQuestionContent = this.chapter.questions![this.chapter.currentQuestion]
    })
  }

  populateAnswers() {
    this.chapterService.getAnswers(this.chapter.chapterNumber.toString()).subscribe((resp: any) => {
      this.chapter.answers = resp.answers;
      this.currentAnswerContent = this.chapter.answers![this.chapter.currentQuestion];
    })
  }

  verifyAnswer() {
    (this.currentAnswerContent.answers.length > 1) ? this.evaluateAnswerCheckboxButton() : this.evaluateAnswersRadioButton();
    this.showExplanation = true;
    localStorage.setItem("responses", JSON.stringify(this.responses));
    localStorage.setItem("score", JSON.stringify(this.score))
    localStorage.setItem("progress", JSON.stringify(this.currentQuestionContent.number))
  }

  evaluateAnswersRadioButton() {
    if (this.currentRadioOption != -1 && this.answersValues[this.currentRadioOption] == this.currentAnswerContent.answers[0]) {
      this.colorQuestionList[this.chapter.currentQuestion] = 1;
      this.responses[this.chapter.currentQuestion] = 1;
      this.score++;
    } else {
      this.responses[this.chapter.currentQuestion] = -1;
      this.colorQuestionList[this.chapter.currentQuestion] = -1;
    }
  }

  evaluateAnswerCheckboxButton() {
    let counterRightAnswers: number = 0;
    let extractedAnswers: string[] = [];

    this.currentCheckBoxSelectedOption.forEach((option: boolean, index: number) => (option) ? extractedAnswers.push(this.answersValues[index]) : option)

    this.currentAnswerContent.answers.forEach((answer) => {
      if (extractedAnswers.includes(answer)) {
        counterRightAnswers++;
      }
    });

    if (this.currentAnswerContent.answers.length == extractedAnswers.length && this.currentAnswerContent.answers.length == counterRightAnswers) {
      this.responses[this.chapter.currentQuestion] = 1;
      this.colorQuestionList[this.chapter.currentQuestion] = 1;
      this.score++;
    } else {
      this.responses[this.chapter.currentQuestion] = -1;
      this.colorQuestionList[this.chapter.currentQuestion] = -1;
    }
  }

  onChangedCheckBoxItem(checked: boolean, index: number) {
    this.currentCheckBoxSelectedOption[index] = checked;
  }

  prevQuestion() {
    this.chapter.currentQuestion--;
    this.resetQuestion();
  }

  nextQuestion() {
    this.chapter.currentQuestion++;
    this.resetQuestion();
  }

  goToQuestion(questionNumber: number) {
    this.chapter.currentQuestion = questionNumber - 1;
    this.resetQuestion();
  }

  resetQuestion() {
    this.currentQuestionContent = this.chapter.questions![this.chapter.currentQuestion]
    this.currentAnswerContent = this.chapter.answers![this.chapter.currentQuestion];
    this.currentRadioOption = -1;
    this.currentCheckBoxSelectedOption.fill(false);
    this.showExplanation = false;
  }

  resetChapter() {
    this.chapter.currentQuestion = 0;
    this.currentQuestionContent = this.chapter.questions![0]
    this.currentAnswerContent = this.chapter.answers![0];
    this.currentRadioOption = -1;
    this.currentCheckBoxSelectedOption.fill(false);
    this.showExplanation = false;
    this.colorQuestionList = new Array().fill(0)
    localStorage.removeItem("score");
    localStorage.removeItem("responses");
    localStorage.removeItem("progress");

  }

  evaluateColor(index: number, element?: string) {

    if (element == 'card') {
      if (this.colorQuestionList[index] == 1) return 'border-color:#008000d6; border-width: 3px;'
      if (this.colorQuestionList[index] == -1) return 'border-color:#ff00008f, border-width: 3px;'
    } else {
      if (this.chapter.currentQuestion == index) return 'background-color: #e5e5e5'
      if (this.colorQuestionList[index] == 1) return 'background-color:#008000d6'
      if (this.colorQuestionList[index] == -1) return 'background-color:#ff00008f'
    }
    return '';
  }

}
