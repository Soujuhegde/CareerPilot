import CourseFinder from "./components/course-finder";
import { Compass } from "lucide-react";

export default function Courses() {
    return (
        <div className="min-h-screen bg-bg-cream pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Hero Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neo-green neo-border-thin text-xs font-black uppercase tracking-widest mb-4">
                        <Compass className="w-4 h-4" /> AI Discovery Engine
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
                        Course <br />
                        <span className="text-neo-blue">Recommendations</span>
                    </h1>
                    <p className="text-xl font-bold max-w-2xl mx-auto text-gray-600">
                        Stop wandering. Our AI architect constructs your personalized learning curriculum and finds the perfect courses to match your ambition.
                    </p>
                </div>

                {/* Main Interaction Area */}
                <CourseFinder />
            </div>
        </div>
    );
}
