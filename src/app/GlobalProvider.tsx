"use client";

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import dayjs, { Dayjs } from "dayjs";

type Global = {
  globalStartDate: Dayjs | null;
  setGlobalStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  globalPeriod: string;
  setGlobalPeriod: Dispatch<SetStateAction<string>>;
};

export const GlobalContext = createContext<Global | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [globalStartDate, setGlobalStartDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [globalPeriod, setGlobalPeriod] = useState<string>("7");

  return (
    <GlobalContext
      value={{
        globalStartDate,
        setGlobalStartDate,
        globalPeriod,
        setGlobalPeriod,
      }}
    >
      {children}
    </GlobalContext>
  );
}
