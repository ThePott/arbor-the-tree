export type BWTopicStep = "topic" | "step"

export interface BookDetail {
    topic: string
    step: string
    question_name: string
    // NOTE: "/"을 넣어서 관리할 것이기 때문에 string이어야 한다
    question_page: string
    solution_page: string
    session: string
}
