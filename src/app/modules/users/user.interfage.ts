export interface TUser {
        id: number
        first_name: string
        last_name: string
        email: string
        gender: string
        avatar: string
        domain: string
        available: boolean
      }
      
      export interface TFilter {
        domain?: string
        gender?: string
        available?: boolean | undefined
      }
      
      export interface UserDocument extends Document {
        domain: string
        gender: string
        available: boolean
      }