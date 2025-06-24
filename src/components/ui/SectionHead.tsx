export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="font-sans text-lg md:text-5xl text-center mt-6 text-black dark:text-white">
        {title}
      </h2>
      <p className="font-sans text-xs text-center md:text-lg lg:text-sm max-w-md mx-auto text-neutral-500 mt-4">
        {description}
      </p>
    </>
  );
}
