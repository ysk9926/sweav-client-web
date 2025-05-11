// hooks/useIsShortHeight.ts
import { useEffect, useState } from "react";

export function useIsShortViewportHeight(threshold: number) {
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setIsShort(window.innerHeight <= threshold);
    };

    checkHeight(); // 초기 실행
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [threshold]);

  return isShort;
}
