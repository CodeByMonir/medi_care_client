import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { FaSpinner } from "react-icons/fa";

export const metadata = {
    title: "Log In",
    description: "Login to access all features",
};


export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FaSpinner className="animate-spin text-2xl text-blue-600 dark:text-blue-400" />
                        <p className="text-sm font-medium">Loading Securing Form...</p>
                    </div>
                </main>
            }
        >
            <LoginForm />
        </Suspense>
    );
}