export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="font-sans text-3xl md:text-5xl text-center mt-6 text-blue-500">
        {title}
      </h2>
      <p className="text-sans md:text-lg lg:text-xl max-w-md mx-auto text-black mt-4">
        {description}
      </p>
    </>
  );
}
