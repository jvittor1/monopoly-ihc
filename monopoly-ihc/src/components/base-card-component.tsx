export default function BaseCardComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`from-primary to-secondary border-2 border-white bg-linear-to-r text-white ${className}`}
    >
      {children}
    </div>
  );
}
