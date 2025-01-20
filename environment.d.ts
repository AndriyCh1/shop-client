declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_SERVER_URL: string;
    readonly SERVER_URL: string;
    readonly AUTH_SECRET: string;
  }
}
