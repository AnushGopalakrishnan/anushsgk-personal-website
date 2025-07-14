import React from 'react';
import { motion } from 'framer-motion';

interface ComingSoonPlaceholderProps {
    columnSpan: string;
}

export function ComingSoonPlaceholder({ columnSpan }: ComingSoonPlaceholderProps) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`group bg-card-background rounded-[8px] overflow-hidden p-8 h-[400px] md:h-[600px] xl:h-[780px] border border-card-border ${columnSpan} flex items-center justify-center`}
        >
            <div className="text-center">
                <h3 className="font-suisse text-xl font-medium text-card-text-primary/60">
                    Coming Soon
                </h3>
                <p className="text-sm text-card-text-secondary/60 mt-2">
                    More projects in the works
                </p>
            </div>
        </motion.div>
    );
} 