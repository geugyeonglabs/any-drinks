"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field, Label } from "@/components/Fieldset";
import { Input } from "@/components/Input";

export default function Period() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(""));
  const [periodDate, setPeriodDate] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <main className="flex flex-col items-center gap-8 w-full">
        <p className="text-gray-400">
          금주 시작 일자와
          <br />
          금주 기간을 입력하세요.
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작 일자"
            value={startDate}
            onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
          />
        </LocalizationProvider>
        <section className="flex justify-between items-center w-full">
          <Field>
            <Label>금주 기간</Label>
            <Input
              type="number"
              value={periodDate}
              onChange={(e: { target: { value: string } }) =>
                setPeriodDate(e.target.value)
              }
            />
          </Field>
          <div className="text-xl">{periodDate}일</div>
        </section>
      </main>
      <footer className="flex flex-col items-center text-gray-400">
        <div>
          금주 기간은 {startDate && startDate.month() + 1}.{startDate?.date()} ~
          09.10 입니다.
        </div>
        <div>음주 가능 기간은 09.11 ~ 09.11 입니다.</div>
      </footer>
    </div>
  );
}
