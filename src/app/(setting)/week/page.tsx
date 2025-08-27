import { Button } from "@/components/button";

export default function Week() {
  return (
    <div className="p-4">
      <main className="flex flex-col items-center gap-8">
        <p className="text-gray-400">단식을 진행할 요일을 입력해주세요</p>
        <section className="flex gap-2">
          <Button outline>일</Button>
          <Button outline>월</Button>
          <Button outline>화</Button>
          <Button outline>수</Button>
          <Button outline>목</Button>
          <Button outline>금</Button>
          <Button outline>토</Button>
        </section>
      </main>
    </div>
  );
}
