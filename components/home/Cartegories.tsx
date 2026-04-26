"use client";
import { motion } from "framer-motion";

export default function Cartegories() {
    return (
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            
            whileTap={{ scale: 0.97 }}
            transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2,
            }}>
            <section className="categories-section py-12" >
                <div className="container mx-auto py-12">
                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                       
                        whileTap={{ scale: 0.97 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.34, 1.56, 0.64, 1],
                            delay: 0.4,
                        }}>
                        <div className="header-section">
                            <h1 className="text-4xl font-bold text-main">Cartegories</h1>
                            <p className="text-gray-500 mt-3">Explore our comprehensive range of ceramic tiles and bathroom ware</p>
                        </div>

                    </motion.div>
                </div>

            </section>

        </motion.div>

    );
}