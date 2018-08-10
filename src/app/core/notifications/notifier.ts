export class Notifier {
  caption: string
  content?: string
  icon?: string
  type: string
  keepOpen: boolean = false
  shadow: boolean = false
  timeout: number = 3000
}

export class NotifierType {
  static Success = 'success'
  static Info = 'info'
  static Warning = 'warning'
  static Alert = 'alert'
}
