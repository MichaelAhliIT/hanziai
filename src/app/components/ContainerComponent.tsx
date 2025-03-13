export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-16">
      <div className="w-full md:w-2/5 flex flex-col p-5">{children}</div>
    </div>
  );
};
