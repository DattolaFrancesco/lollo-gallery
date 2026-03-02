import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center flex-col">
        {Array.from({ length: 10 }).map((e, i) => {
          return (
            <div key={i} className="w-1/2 h-svh flex justify-center items-center">
              <Image src="/bigbang.jpg" alt="foto" width={800} height={1200} />
            </div>
          );
        })}
      </main>
    </>
  );
}
