import { ITimestamp } from '../../interfaces/ITimestamp'
import { VerificationOfficer } from '../core/verification_officer'
import { AttachedDocument } from './attached_document'

export interface Land extends ITimestamp {
  address: string
  size_area: string
  gps_location?: string
  region: string
  district: string
  locality: string
  applicable_tenure_codes?: string[]
  is_tenureship_verified?: boolean
  are_documents_verified?: boolean
  documents?: AttachedDocument[]
  date_verified?: Date
  verified_by?: VerificationOfficer
  remarks?: string
}
