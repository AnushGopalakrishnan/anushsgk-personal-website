import { useState, useEffect } from 'react';

export function useColumnCount() {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1800) setColumns(3);
            else if (width >= 768) setColumns(2);
            else setColumns(1);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return columns;
} 