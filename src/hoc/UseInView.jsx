import { useRef } from "react";
import { useInView } from "framer-motion";

export default function View({ children }) {
    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <section ref={ref} className="w-full">
            <span
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
            >
                {children}
            </span>
        </section>
    );
}
