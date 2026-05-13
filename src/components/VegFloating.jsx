import { motion } from "framer-motion"

const Badge = ({ color, innerColor, label }) => {
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
        >
            {/* glow */}
            <div
                className="absolute inset-0 blur-lg rounded-full"
                style={{ background: color + "33" }}
            />

            {/* box */}
            <div
                className="relative w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/80 backdrop-blur-md
        border shadow-md flex items-center justify-center"
                style={{ borderColor: color + "55" }}
            >
                <div
                    className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 border-2 flex items-center justify-center"
                    style={{ borderColor: color }}
                >
                    <div
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                        style={{ background: innerColor }}
                    />
                </div>
            </div>

            {/* label */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] tracking-widest uppercase text-[#0F5C5C]/50">
                {label}
            </span>
        </motion.div>
    )
}

const VegFloating = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-6 z-[999] flex flex-row md:flex-col gap-3 md:gap-4 pointer-events-none"
        >
            <Badge color="#16a34a" innerColor="#16a34a" />
            <Badge color="#dc2626" innerColor="#dc2626" />
            <Badge color="#eab308" innerColor="#eab308" />
        </motion.div>
    )
}

export default VegFloating