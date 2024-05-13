export class AppConstants {

  public static readonly API_URL: string = 'http://localhost:8080/api/v1';

  public static readonly SIGNIN_URL: string = AppConstants.API_URL + "/auth/signin";
  public static readonly USER_URL: string = AppConstants.API_URL + "/auth/user";

  public static readonly TESTS_URL: string = AppConstants.API_URL + "/tests";
}