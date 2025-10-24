import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e003e, #2e005a)",
      }}
    >
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
