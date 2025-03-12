export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="md:w-2/5 flex flex-col p-5">{children}</div>
    </div>
  );
};
