"use client";

import { Button } from "@/components/ui/button";
import AppModal from "./AppModal";
import LoadingSpinner from "./LoadingSpinner";

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  description: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationModal({
  open,
  title,
  description,
  isLoading,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="mr-1 h-4 w-4" /> : null}
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-sm text-zinc-600">{description}</p>
    </AppModal>
  );
}
