import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src="/transfer.png" alt="Logo" width={30} height={30} />
      <div className="flex items-center text-xl text-black dark:text-white font-bold">
        Safe<span className="text-blue-600">Beam03</span>
      </div>
    </div>
  );
}
