export interface StatusModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    statusAction: string;
    warningMsg?: string;
    fields?: string;
}