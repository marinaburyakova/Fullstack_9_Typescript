// ИСПРАВЛЕНО ДЛЯ "erasableSyntaxOnly": Вместо enum используем Union Types
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// Тип для отправки новой записи на сервер (без ID)
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
