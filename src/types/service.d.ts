import type { LocalizedText, SupportedEnv, SupportedDevice } from './common'

export interface ServiceListItem {
  id: string
  name: string
  serviceUrl: string
  iconUrl: string
  description: {
    [key in LocalizedText]: string
  }
  supportNetwork?: string[]
  supportedLang?: LocalizedText[]
  supportEnv?: SupportedEnv[]
  supportedDevice?: SupportedDevice[]
}
