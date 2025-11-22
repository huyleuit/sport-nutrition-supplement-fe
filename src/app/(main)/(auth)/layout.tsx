export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white py-[3.5rem]">
      <div className="mx-auto flex w-[25rem] flex-col">{children}</div>
    </div>
  );
}
