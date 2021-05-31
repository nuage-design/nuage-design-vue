import { Ref } from 'vue'

export interface IOption {
  value: string
  title: string
  disabled: boolean
  leftIcon: string
  rightIcon: string
}

export interface IRenderedOption {
  uid: number
  title: string
  value: string
  selected: Ref
}
