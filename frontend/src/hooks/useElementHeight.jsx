import { useState, useEffect, useCallback } from "react";
export function useElementHeight(ref) {
  const [height, setHeight] = useState(0);
  const measureHeight = useCallback(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  useEffect(() => {
    measureHeight();
    const resizeObserver = new ResizeObserver(() => {
      measureHeight();
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, measureHeight]);

  return height;
}
