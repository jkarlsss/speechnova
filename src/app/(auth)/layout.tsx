const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-1 items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
