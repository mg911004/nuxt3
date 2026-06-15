import 'axios';

declare module 'axios' {
  // axios request config
  export interface AxiosRequestConfig {
    /** 인증 API는 토큰 없이 요청 가능 */
    skipAuth?: boolean;
    /** 로딩 인디케이터 비활성화 */
    skipLoading?: boolean;
    /** 재시도 플래그 */
    _retry?: boolean;
  }

  // axios instance config
  export interface InternalAxiosRequestConfig {
    /** 인증 API는 토큰 없이 요청 가능 */
    skipAuth?: boolean;
    /** 로딩 인디케이터 비활성화 */
    skipLoading?: boolean;
    /** 재시도 플래그 */
    _retry?: boolean;
  }
}
