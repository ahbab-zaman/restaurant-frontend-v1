"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Hotel, HotelMutationPayload } from "@/types/hotel";
import AppModal from "./AppModal";
import LoadingSpinner from "./LoadingSpinner";

type HotelFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  hotel?: Hotel | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: HotelMutationPayload) => Promise<void>;
};

export default function HotelFormModal({
  open,
  mode,
  hotel,
  isLoading,
  onClose,
  onSubmit,
}: HotelFormModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(hotel?.name ?? "");
    setAddress(hotel?.address ?? "");
    setDescription(hotel?.description ?? "");
    setImage(null);
    setPreviewUrl(null);
    setFileInputKey((prev) => prev + 1);
    setError(null);
  }, [open, hotel]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const isCreateMode = mode === "create";

  function clearSelectedImage() {
    setImage(null);
    setPreviewUrl(null);
    setFileInputKey((prev) => prev + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError("Name and address are required.");
      return;
    }

    if (isCreateMode && !image) {
      setError("Hotel image is required.");
      return;
    }

    setError(null);
    await onSubmit({
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
      image,
    });
  }

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isCreateMode ? "Add Hotel" : "Edit Hotel"}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="hotel-form" disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="mr-1 h-4 w-4" /> : null}
            {isCreateMode ? "Create Hotel" : "Update Hotel"}
          </Button>
        </div>
      }
    >
      <form id="hotel-form" className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Name</label>
          <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Hotel name" className="text-gray-900" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Address</label>
          <Input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Hotel address" className="text-gray-900" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Description</label>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description (optional)"
            className="min-h-24 text-gray-900 resize-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Image {isCreateMode ? "" : "(optional for update)"}
          </label>
          <Input
            key={fileInputKey}
            type="file"
            accept="image/*"
            className="text-gray-900"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          />
          {previewUrl ? (
            <div className="relative mt-2 inline-block">
              <img
                src={previewUrl}
                alt="Selected hotel"
                className="h-16 w-16 rounded-md border border-zinc-200 object-cover"
              />
              <button
                type="button"
                onClick={clearSelectedImage}
                className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white transition hover:bg-red-700"
                aria-label="Remove selected image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </AppModal>
  );
}
