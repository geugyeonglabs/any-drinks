"use client";

import {
  createContext,
  useState,
  ReactNode,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type Setting = {
  startDate: Dayjs | null;
  setStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type SavedSetting = {
  startDate: string;
  period: string;
};

export const DB_NAME = "AnyDrinksDB";
export const DB_VERSION = 1;
export const STORE_NAME = "setting";

export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addSetting = async (setting: SavedSetting): Promise<number> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(setting);

    request.onsuccess = () => {
      resolve(request.result as number);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const SettingContext = createContext<Setting | null>(null);

export default function SettingLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().startOf("day")
  );
  const [period, setPeriod] = useState<string>("7");

  const tabs = [
    { name: "기간별 금주", href: "#", current: segment === "period" },
    { name: "요일별 금주", href: "#", current: segment === "week" },
  ];

  const handleTab = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "기간별 금주") {
      router.replace("/period");

      return;
    }

    router.replace("/week");
  };

  const handleSave = async () => {
    addSetting({
      startDate: startDate?.toISOString() || "",
      period,
    });

    router.push("/");
  };

  return (
    <div className="p-2">
      <div className="relative border-b border-gray-200 pb-5 sm:pb-0 dark:border-white/10">
        <div className="md:flex md:items-center md:justify-between">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            금주 타이머 설정
          </h3>
          <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
              onClick={() => router.back()}
            >
              뒤로가기
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:hidden">
            <select
              defaultValue={tabs.find((tab) => tab.current)?.name}
              aria-label="Select a tab"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-white"
              onChange={handleTab}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
            />
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white",
                    "border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <SettingContext value={{ startDate, setStartDate, period, setPeriod }}>
        {children}
      </SettingContext>
    </div>
  );
}
