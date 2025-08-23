"use client";

import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Home() {
  return (
    <>
      <header className="mb-[5dvh] p-2 text-right">
        <Link href="/period">
          <SettingsIcon fontSize="large" />
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center gap-16">
        <section className="flex flex-col items-center gap-4">
          <div className="text-5xl font-medium">23</div>
          <div className="text-3xl">토요일</div>
        </section>
        <section className="flex flex-col items-center text-xl text-gray-500">
          <div>
            절주 <span className="text-2xl font-medium text-black">7</span>일차
          </div>
          <div>
            금주 <span className="text-2xl font-medium text-black">7</span>일째
          </div>
        </section>
        <section className="flex flex-col items-center gap-6">
          <div className="text-2xl">금주 종료</div>
          <div>
            <span className="text-9xl text-blue-700">0일</span>
            <span className="text-lg text-gray-500">전</span>
          </div>
        </section>
      </main>
      <footer className="absolute bottom-8 flex flex-col items-center w-dvw text-gray-400">
        <div>금주 기간은 08.16 ~ 08.22 입니다.</div>
        <div>음주가능 기간은 08.23 ~ 08.23 입니다.</div>
      </footer>
    </>
  );
}
