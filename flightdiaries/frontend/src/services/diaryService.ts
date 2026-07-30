import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types'

const baseUrl = '/api/diaries';



export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const createDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, object)
  return response.data
}
