import Logo from "@/components/logo";

export default function OgImage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="w-screen h-screen bg-white dark:bg-black"
    >
      <Logo />
      <span
        style={{ margin: "0 1rem", fontSize: "2rem" }}
        className=" text-black dark:text-white"
      >
        |
      </span>
      <span
        style={{ fontSize: "2rem" }}
        className=" text-black dark:text-white font-sans"
      >
        A Project by Tanay Hingane
      </span>
    </div>
  );
}
