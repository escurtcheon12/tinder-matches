export enum StatusMessage {
  LOGIN_OK = 'Login successfully',
  LIST_OK = 'Success get data',
  LIST_FAILED = 'Failed get data',
  CREATE_OK = 'Data has been saved successfully',
  CREATE_FAILED = 'Failed save data',
  UPDATE_OK = 'Data has been updated',
  UPDATE_FAILED = 'Failed update data',
  GET_OPPOSITE_MATCH_OK = 'Success get opposite matcher ',
}

export enum UserGender {
  MALE = 0,
  FEMALE = 1,
}

export enum UserConnection {
  ONLINE = 1,
  OFFLINE = 2,
}

export enum UserMatcher {
  IDDLE = 1,
  FIND = 2,
  GET = 3,
}
