export class GraphQLErrors {
  private static INVALID_COUNT_ERROR: string = 'invalid_count'
  private static INVALID_CREDENTIALS: string = 'lang_headers.invalid_credentials'
  private static INVALID_PRODUCT: string = 'invalid_product'
  private static INVALID_PRODUCT_CODE: string = 'invalid_product_code'
  private static INVALID_PRODUCT_UNLICENSED: string = 'unlicensed_product'
  private static SUSPENDED_ACCOUNT: string = 'suspended_account'
  private static DUPLICATED_PROFILE: string = 'user_exists'

  public static getInvalidCountMsg(): string {
    return this.INVALID_COUNT_ERROR
  }

  public static getInvalidCredentialsMsg(): string {
    return this.INVALID_CREDENTIALS
  }

  public static getInvalidProductMsg(): string {
    return this.INVALID_PRODUCT_CODE
  }

  public static getSuspendedAccountMsg(): string {
    return this.SUSPENDED_ACCOUNT
  }

  public static getUnLicensedProduct(): string {
    return this.INVALID_PRODUCT_UNLICENSED
  }

  public static isDuplicateProfile(msg: string): boolean {
    return msg.includes(this.DUPLICATED_PROFILE)
  }

  public static isInvalidCredentials(msg: string): boolean {
    return msg.includes(this.INVALID_CREDENTIALS)
  }

  public static isInvalidProduct(msg: string): boolean {
    return msg.includes(this.INVALID_PRODUCT) && msg.includes(this.INVALID_PRODUCT_CODE)
  }

  public static isSuspendedAccount(msg: string): boolean {
    return msg.includes(this.SUSPENDED_ACCOUNT)
  }

  public static isUnlicensedProduct(msg: string): boolean {
    return msg.includes(this.INVALID_PRODUCT_UNLICENSED)
  }
}
