export class AppConstants {

  public static readonly API_URL: string = 'http://192.168.1.68:8080/api/v1';

  public static readonly SIGNIN_URL: string = AppConstants.API_URL + "/auth/signin";
  public static readonly USER_URL: string = AppConstants.API_URL + "/auth/user";

}