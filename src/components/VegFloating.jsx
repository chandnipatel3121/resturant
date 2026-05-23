import { motion } from "framer-motion"

const Badge = ({ color, innerColor, label }) => {
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
        >
            {/* rounded square border container */}
            <div
                className="w-5 h-5 md:w-6 md:h-6 border-[1.5px] md:border-2 rounded-[4px] md:rounded-[6px] flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm"
                style={{ borderColor: color }}
            >
                {/* inner solid dot */}
                <div
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                    style={{ background: innerColor }}
                />
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