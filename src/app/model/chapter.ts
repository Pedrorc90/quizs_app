import { Answer } from "./answer";
import { ChapterMeta } from "./chapter.meta";
import { Question } from "./question";

export interface Chapter extends ChapterMeta {
    currentQuestion: number,
    score: number,
    questions?: [Question],
    answers?: [Answer],
    responses?: any
}