export interface User {
  _id: string;
  account_status: string;
  activate_time: number;
  activation_code: string;
  activation_time: number;
  banned_list: string[];
  benefit_id: string;
  bonus_account: {
    VND: number;
  };
  cash_wallet: {
    payme: Payme;
  };
  city_id: string[];
  cod_account: {
    VND: number;
  };
  country_code: string;
  create_time: number;
  currency: string;
  devices: UserDevice[];
  email: string;
  extra: UserExtra;
  extra_services: string[];
  favorite_list: string[];
  google_id: string;
  has_first_order: boolean;
  id_name: string;
  last_activity: number;
  last_login: number;
  main_account: {
    VND: number;
  };
  max_stop_points: number;
  name: string;
  num_rating: number;
  points: number;
  rating: number;
  referral_code: string;
  saas: boolean;
  status: string;
  tags: string[];
  user_type: string;
  verified: boolean;
  verify_status: string;
  verify_time: number;
  wallet_info: {
    bank: Bank;
    payme: Payme;
  };
}

export interface UserDevice {
  app?: string;
  fcm?: boolean;
  imei: string;
  push?: string;
  status?: string;
  time: number;
  type: string;
}

export interface UserExtra {
  auto_transfer_cod: {
    enable: boolean;
    payment_provider: string;
  };
  contact: null;
  contract: {
    type: string;
  };
  documents: {
    img_url: string;
    status: string;
    submit_time: number;
    type: string;
  }[];
  eWallet: null;
  invoice: {
    auto_issue: boolean;
  };
  is_auto_transfer_cod: boolean;
  log_benefit: string;
  log_verified: string;
  old_device_id: string;
  order_tags: string[];
  rank: string;
  wootric_count: number;
  wootric_time: number;
}

export interface Payme {
  last_update: number;
  status: string;
}

export interface Bank {
  account_id: string;
  account_name: string;
  branch: string;
  last_update: number;
  name: string;
  virtual_account: VirtualAccount;
}

export interface VirtualAccount {
  id: string;
  name: string;
}

export type JwtTokenPayload = {
  typ: string;
  cid: string;
  status: string;
  eoc: string;
  noc: string;
  cty: string;
  imei: string;
  type: string;
  exp: number;
  iat: number;
  iss: string;
};
