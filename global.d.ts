export {}; // TypeScript 모듈 스코프 유지

declare global {
  interface Window {
    receiveMessageFromFlutter?: (message: string) => void;
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: any[]) => Promise<any>;
    };
  }
}
