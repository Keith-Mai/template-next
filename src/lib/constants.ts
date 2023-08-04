export const __prod__ = process.env.NODE_ENV === "production";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;
export const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === "true";
export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URI || "https://metacrew.com";
export const domainUrl = process.env.NEXT_PUBLIC_APP_DOMAIN || "metacrew.com";

export const PAGE_INDEX = 0;
export const PAGE_SIZE = 22;

export const API_FETCH_TIMEOUT = 7;

export const ERROR_CODES = {
  NOT_ENOUGH_CREDIT: {
    code: "NOT_ENOUGH_CREDIT",
    description: "Tài khoản không đủ tiền hoặc không phải là tài khoản công nợ",
    http_code: 406,
    internal: "",
    title: "Not enough credit",
  },
  NOT_AUTHORIZED: {
    code: "NOT_AUTHORIZED",
    description:
      "Không có quyền thực hiện thao tác này, vui lòng kiểm tra lại.",
    http_code: 401,
    title: "Thao tác bị từ chối.",
  },
  REFRESH_TOKEN_HAS_EXPIRED: {
    code: "REFRESH_TOKEN_HAS_EXPIRED",
    http_code: 401,
    title: "Token expired",
    description: "Your token has expired, please sign in again.",
    internal: "",
  },
};

export enum WEB_IN_APP_EVENT {
  CLOSE = "close",
  BACK = "back",
  HIDE_TOOLBAR = "hide_toolbar",
  GET_TOKEN = "getToken",
  OPEN_PAGE = "openPage",
}
