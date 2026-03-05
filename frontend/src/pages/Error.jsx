import { AlertTriangle, Home } from "lucide-react";

function Error() {
    return (
        <div className="h-[85vh] flex items-center justify-center">
            <div className="max-w-md w-full bg-slate-50 rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 text-red-600 p-4 rounded-full">
                        <AlertTriangle size={40} />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Oops! Something went wrong
                </h1>
                <p className="text-gray-500 mb-6">
                    We’re sorry, but an unexpected error has occurred. Please try again
                    or return to the homepage.
                </p>
                <div className="bg-gray-100 rounded-lg py-2 px-4 mb-6 inline-block">
                    <span className="text-sm font-mono text-gray-600">
                        Error 500 — Internal Server Error
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                        href="/"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </a>
                </div>
                <p className="mt-8 text-xs text-gray-400">
                    If the problem persists, contact support.
                </p>
            </div>
        </div>
    );
}

export default Error;