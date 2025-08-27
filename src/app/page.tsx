"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  initDB,
  addSetting,
  STORE_NAME,
  SavedSetting,
} from "@/app/(setting)/layout";

export default function Home() {
  const today = dayjs().startOf("date");

  const [savedStartDate, setSavedStartDate] = useState<Dayjs | null>();
  const [savedPeriod, setSavedPeriod] = useState<string>();
  const [savedWeeks, setSavedWeeks] = useState<string[]>();

  const getSetting = async (): Promise<SavedSetting> => {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result.at(-1) as SavedSetting);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const loadSetting = useCallback(async () => {
    const savedSetting = await getSetting();

    if (!savedSetting) {
      addSetting({
        startDate: dayjs().startOf("date").toISOString(),
        period: "7",
      });

      location.reload();
    }

    setSavedStartDate(dayjs(savedSetting.startDate));
    setSavedPeriod(savedSetting.period);
    setSavedWeeks(localStorage.getItem("weeks")?.split(","));
  }, []);

  useEffect(() => {
    loadSetting();
  }, [loadSetting]);

  return (
    <>
      <header className="mb-[5dvh] p-2 text-right">
        <Link href="/period">
          <SettingsIcon fontSize="large" />
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center gap-8">
        <section className="flex flex-col items-center gap-4">
          <div className="text-5xl font-medium">{today.date()}</div>
          <div className="text-3xl">
            {today.day() === 0 && "일요일"}
            {today.day() === 1 && "월요일"}
            {today.day() === 2 && "화요일"}
            {today.day() === 3 && "수요일"}
            {today.day() === 4 && "목요일"}
            {today.day() === 5 && "금요일"}
            {today.day() === 6 && "토요일"}
          </div>
        </section>
        <section className="text-xl text-gray-500">
          금주&nbsp;
          <span className="text-2xl font-medium text-black">
            {today.diff(savedStartDate, "day") + 1}
          </span>
          일째
        </section>
        <section className="flex flex-col items-center gap-6">
          <div className="text-2xl">금주 종료</div>
          <div>
            <span className="text-9xl text-blue-700">
              {savedStartDate
                ?.add(Number(savedPeriod), "day")
                .diff(today, "day")}
              일
            </span>
            <span className="text-lg text-gray-500">전</span>
          </div>
        </section>
      </main>
      <footer className="absolute bottom-8 flex flex-col items-center w-dvw text-gray-400">
        {savedWeeks?.[0] && (
          <p>
            금주 요일 :&nbsp;
            {savedWeeks.map((week, index) => {
              switch (week) {
                case "0":
                  return index === savedWeeks.length - 1 ? "일요일" : "일,";
                case "1":
                  return index === savedWeeks.length - 1 ? "월요일" : "월,";
                case "2":
                  return index === savedWeeks.length - 1 ? "화요일" : "화,";
                case "3":
                  return index === savedWeeks.length - 1 ? "수요일" : "수,";
                case "4":
                  return index === savedWeeks.length - 1 ? "목요일" : "목,";
                case "5":
                  return index === savedWeeks.length - 1 ? "금요일" : "금,";
                case "6":
                  return index === savedWeeks.length - 1 ? "토요일" : "토,";
              }
            })}
          </p>
        )}
        <p>
          금주 기간은&nbsp;
          {savedStartDate && savedStartDate.month() + 1}.
          {savedStartDate?.date()}
          &nbsp;~&nbsp;
          {savedStartDate &&
            savedStartDate.add(Number(savedPeriod) - 1, "day").month() + 1}
          .
          {savedStartDate &&
            savedStartDate.add(Number(savedPeriod) - 1, "day").date()}{" "}
          입니다.
        </p>
        <p>
          음주 가능 기간은&nbsp;
          {savedStartDate &&
            savedStartDate.add(Number(savedPeriod), "day").month() + 1}
          .
          {savedStartDate &&
            savedStartDate.add(Number(savedPeriod), "day").date()}{" "}
          ~ 입니다.
        </p>
      </footer>
    </>
  );
}
