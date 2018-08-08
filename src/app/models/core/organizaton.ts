import { OrganizationAffiliateLevel } from 'src/app/models/assistive/organization_affiliate_levels'
import { OrganizationManagementPerson } from 'src/app/models/assistive/organization_management_person'
import { BankAccount } from '../assistive/bank_account'
import { EnterpriseEngagement } from '../assistive/enterprise_engagement'
import { OrganizationContactPerson } from '../assistive/organization_contact_person'
import { OrganizationDirector } from '../assistive/organization_director'
import { OrganizationHead } from '../assistive/organization_head'
import { OrganizationShareholder } from '../assistive/organization_shareholders'
export interface Organization {
  id?: string
  type_ref?: string
  company_name: string
  trading_mark?: string
  registered_trade_mark?: string
  date_of_incorporation: Date
  nature_of_business: string
  postal_address?: string
  city: string
  post_code: string
  region: string
  country: string
  physical_address: string
  main_phone_line: string
  main_fax_line?: string
  website?: string
  is_multi_estate: string
  central_organizational_structure_name: string
  certificate_of_incorporation_url?: string
  registrar_of_shareholders_doc_url?: string
  registrar_of_directors_doc_url?: string
  head: OrganizationHead
  contact_person: OrganizationContactPerson
  directors: OrganizationDirector[]
  shareholders: OrganizationShareholder[]
  management: OrganizationManagementPerson[]
  regions: string[]
  countries: string[]
  affiliate_levels?: OrganizationAffiliateLevel[]
  bank_details: BankAccount
  enterprise_engagement: EnterpriseEngagement
}
