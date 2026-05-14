import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type RevertibleSplit = {
  revert: () => void;
};

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLoading] = useState(100);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  
  useEffect(() => {
    let ctxClean: gsap.Context | undefined;
    let splitsClean: RevertibleSplit[] = [];
    let timeoutId: number | undefined;
    let isMounted = true;

    document.fonts.ready.then(() => {
      if (!isMounted) return;
      import("../components/utils/initialFX").then((module) => {
        if (!isMounted) return;
        timeoutId = setTimeout(() => {
          if (module.initialFX) {
            const result = module.initialFX();
            ctxClean = result.ctx;
            splitsClean = result.splits;
          }
        }, 50);
      });
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (ctxClean) ctxClean.revert();
      splitsClean.forEach((split) => split.revert());
    };
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
