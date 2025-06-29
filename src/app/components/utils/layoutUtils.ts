import { useColumnCount } from '../hooks/useColumnCount';
import type { Project } from '@/types/sanity';

export function usePlaceholderLogic() {
    const columnCount = useColumnCount();

    const getPlaceholderColumnSpan = (projects: Project[]) => {
        if (!projects.length) return '';

        const itemsInLastRow = projects.length % columnCount;
        const isLastRowComplete = itemsInLastRow === 0;
        
        if (isLastRowComplete && projects.length >= columnCount) {
            return columnCount === 2 ? 'md:col-span-2' : 
                   columnCount === 3 ? 'xl:col-span-3' : '';
        }

        if (!isLastRowComplete) {
            const remainingColumns = columnCount - itemsInLastRow;
            return remainingColumns === 2 ? 'md:col-span-2' : 
                   remainingColumns === 3 ? 'xl:col-span-3' : '';
        }

        return '';
    };

    const shouldShowPlaceholder = (projects: Project[]) => {
        if (!projects.length) return false;

        const itemsInLastRow = projects.length % columnCount;
        const isLastRowComplete = itemsInLastRow === 0;
        
        return (isLastRowComplete && projects.length >= columnCount) || !isLastRowComplete;
    };

    return { getPlaceholderColumnSpan, shouldShowPlaceholder };
} 