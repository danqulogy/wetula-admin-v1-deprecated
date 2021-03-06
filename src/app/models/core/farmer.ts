import { BankAccount } from '../assistive/bank_account'
import { CareTaker } from '../assistive/caretaker'
import { EnterpriseEngagement } from '../assistive/enterprise_engagement'
import { Land } from '../assistive/land'
import { PhysicalAddress } from '../assistive/physical_address'
import { PostalAddress } from '../assistive/postal_address'

export interface Farmer {
  //Personal
  id?: string
  applicant_number?: number
  registration_number?: number
  surname: string
  first_name: string
  middle_name?: string
  nickname?: string
  sex: string
  date_of_birth: string
  id_card: IDCard
  is_absentee_farmer: boolean
  phone_number: string
  email: string
  password?: string
  caretaker?: CareTaker
  enterprise_engagement: EnterpriseEngagement[]
  land_parcels: Land[]

  // Location Address
  physical_address?: PhysicalAddress
  postal_address?: PostalAddress

  // Attachments
  photograph_url?: string
  applicant_signage_url?: string
  number_of_lands?: number
  bank_info?: BankAccount
}

export interface IDCard {
  type: string
  number: string
}
