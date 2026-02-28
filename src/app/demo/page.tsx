import Link from "next/link";

export default function Demo() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-neo-blue neo-border neo-shadow-lg p-10 max-w-lg w-full text-center">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white">Book Demo</h1>
                <p className="text-white font-bold mb-8 text-lg">See CareerPilot in action with our recruiting experts.</p>
                <div className="space-y-4 mb-8">
                    <input type="text" placeholder="Company Name" className="w-full neo-border-thin p-4 font-bold bg-white" />
                    <input type="email" placeholder="Work Email" className="w-full neo-border-thin p-4 font-bold bg-white" />
                    <button className="w-full px-8 py-4 bg-neo-green text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                        Schedule Tour
                    </button>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest text-white hover:text-neo-yellow underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
