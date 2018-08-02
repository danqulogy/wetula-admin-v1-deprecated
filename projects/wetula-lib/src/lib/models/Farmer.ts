import {Gender} from '../valueObjects/Gender'

export interface Farmer {
    id?: string
    applicant_number: number
    registration_number: number
    photograph_url: string
    surname: string
    first_name: string
    middle_name: string
    nickname: string
    sex: Gender
}
