import { useCallback, useState } from "react";

/**
 * Hook que encapsula la descarga de un archivo (blob) con nombre.
 * Recibe el blob y el filename mediante una función async y expone el estado de descarga.
 */
export function useDownloadFile() {
    const [isDownloading, setIsDownloading] = useState(false);

    const download = useCallback(async (getFile: () => Promise<{ blob: Blob; filename: string }>) => {
        setIsDownloading(true);
        try {
            const { blob, filename } = await getFile();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } finally {
            setIsDownloading(false);
        }
    }, []);

    return { download, isDownloading };
}
