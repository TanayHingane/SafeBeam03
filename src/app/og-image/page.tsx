import Image from "next/image";

export default function OgImage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
      className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="flex items-center justify-center gap-2">
        <Image src="/transfer.png" alt="Logo" width={50} height={50} />
        <div className="flex items-center text-4xl text-black dark:text-white font-bold">
          Safe<span className="text-blue-600">Beam</span>
        </div>
      </div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "",
          fontFamily: "sans-serif",
        }}
      >
        |
      </h1>
      <p style={{ fontSize: "2rem", fontFamily: "sans-serif" }}>
        Secure and Anonymous File Sharing
      </p>
      <div
        style={{
          position: "absolute",
          bottom: "24rem",
          fontSize: "1.5rem",
          fontFamily: "sans-serif",
        }}
      >
        Created by Tanay Hingane
      </div>
    </div>
  );
}
