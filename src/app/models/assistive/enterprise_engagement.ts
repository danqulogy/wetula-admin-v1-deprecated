import { EnterpriseEngagementLevel } from '../../valueObjects/enterprise_engagement_level'
import { Enterprise } from '../core/enterprise'
export interface EnterpriseEngagement {
  enterprise: Enterprise
  engagement_level: EnterpriseEngagementLevel
}
