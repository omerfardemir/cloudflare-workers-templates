import type {SharedHonoEnv, SharedHonoVariables, HonoApp} from '@monocf/types'

export type Env = SharedHonoEnv & {
  USER: string
}

/** Variables can be extended */
export type Variables = SharedHonoVariables

export interface App extends HonoApp {
  Bindings: Env
  Variables: Variables
}
