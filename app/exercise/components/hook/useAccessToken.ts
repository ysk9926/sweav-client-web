"use client";

import { useEffect, useState } from "react";

// Swift와 통신하기 위한 인터페이스 타입 선언
declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        accessTokenHandler: {
          postMessage: (message: string) => void;
        };
      };
    };
  }
}

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Swift로부터 토큰 요청
    if (window.webkit?.messageHandlers?.accessTokenHandler) {
      window.webkit.messageHandlers.accessTokenHandler.postMessage(
        "requestAccessToken"
      );
    }
  }, []);

  // Swift로부터 토큰을 받는 전역 함수
  useEffect(() => {
    // @ts-ignore
    window.receiveAccessToken = (token: string) => {
      setAccessToken(token);
    };

    return () => {
      // @ts-ignore
      delete window.receiveAccessToken;
    };
  }, []);

  return accessToken;
};
