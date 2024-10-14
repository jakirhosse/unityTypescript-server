export interface IUser {
        name: string;
        email: string;
        password: string;
        resetPasswordToken?: string;
        resetPasswordExpire?: Date;
      }
      