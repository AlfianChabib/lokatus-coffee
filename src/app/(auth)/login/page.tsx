import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8 rounded-lg border bg-background p-4">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-xs text-muted-foreground">
            Enter your username and password to login your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
