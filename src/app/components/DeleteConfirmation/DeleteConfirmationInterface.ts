export interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    entityName: string;
}