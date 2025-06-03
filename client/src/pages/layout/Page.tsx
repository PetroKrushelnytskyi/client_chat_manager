import Header from './Header';

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 pt-16">{children}</div>
      </div>
    </>
  );
};
