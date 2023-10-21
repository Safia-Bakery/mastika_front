import { useEffect, useCallback, useRef, SetStateAction } from "react";
import { BasePaginatedRes } from "src/utils/types";

interface Props {
  isLoading: boolean;
  data?: BasePaginatedRes;
  page: number;
  $page: (page: SetStateAction<number>) => void;
}

const useInfiniteScroll = ({ isLoading, data, page, $page }: Props) => {
  const observer = useRef<any>();

  const lastBookElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.pages && data?.pages >= page) {
          $page((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, data, page, $page]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return lastBookElementRef;
};

export default useInfiniteScroll;
