export interface Question {
    name: string;
    body: string;
    points: number;
    type: string;
    options: string[];
    expected: string;
    id: number;
    published: boolean;
}
