"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Hotel } from "@/types/hotel";
import {
  CreateRoomPayload,
  Room,
  RoomType,
  UpdateRoomPayload,
} from "@/types/room";
import AppModal from "@/app/components/ui/common/AppModal";
import LoadingSpinner from "@/app/components/ui/common/LoadingSpinner";

const ROOM_TYPES: RoomType[] = [
  "SINGLE",
  "DOUBLE",
  "TWIN",
  "SUITE",
  "DELUXE",
  "FAMILY",
];

type RoomFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  room?: Room | null;
  hotels: Hotel[];
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateRoomPayload | UpdateRoomPayload) => Promise<void>;
};

export default function RoomFormModal({
  open,
  mode,
  room,
  hotels,
  isLoading,
  onClose,
  onSubmit,
}: RoomFormModalProps) {
  const [hotelId, setHotelId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState<RoomType>("SINGLE");
  const [price, setPrice] = useState("0");
  const [capacity, setCapacity] = useState("1");
  const [floor, setFloor] = useState("1");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isCreateMode = mode === "create";

  const initialHotelId = useMemo(
    () => room?.hotelId ?? hotels[0]?.id ?? "",
    [room?.hotelId, hotels],
  );

  useEffect(() => {
    if (!open) return;
    setHotelId(initialHotelId);
    setRoomNumber(room?.roomNumber ?? "");
    setType(room?.type ?? "SINGLE");
    setPrice(String(room?.price ?? 0));
    setCapacity(String(room?.capacity ?? 1));
    setFloor(String(room?.floor ?? 1));
    setDescription(room?.description ?? "");
    setAmenities(room?.amenities?.join(", ") ?? "");
    setIsAvailable(room?.isAvailable ?? true);
    setQuantity("1");
    setImage(null);
    setPreviewUrl(null);
    setFileInputKey((prev) => prev + 1);
    setError(null);
  }, [open, room, initialHotelId]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hotelId) {
      setError("Hotel is required.");
      return;
    }

    if (isCreateMode && !roomNumber.trim()) {
      setError("Room number is required.");
      return;
    }

    setError(null);

    const parsedAmenities = amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (isCreateMode) {
      await onSubmit({
        hotelId,
        roomNumber: roomNumber.trim(),
        type,
        price: Number(price),
        capacity: Number(capacity),
        floor: Number(floor),
        description: description.trim(),
        amenities: parsedAmenities,
        isAvailable,
        quantity: Number(quantity),
        image,
      } satisfies CreateRoomPayload);
      return;
    }

    await onSubmit({
      type,
      price: Number(price),
      capacity: Number(capacity),
      floor: Number(floor),
      description: description.trim(),
      amenities: parsedAmenities,
      isAvailable,
      image,
    } satisfies UpdateRoomPayload);
  }

  function clearSelectedImage() {
    setImage(null);
    setPreviewUrl(null);
    setFileInputKey((prev) => prev + 1);
  }

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isCreateMode ? "Add Room" : "Edit Room"}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" form="room-form" disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="mr-1 h-4 w-4" /> : null}
            {isCreateMode ? "Create Room" : "Update Room"}
          </Button>
        </div>
      }
    >
      <form
        id="room-form"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-gray-900">Hotel</label>
          <select
            value={hotelId}
            onChange={(event) => setHotelId(event.target.value)}
            disabled={!isCreateMode}
            className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm text-gray-900"
          >
            <option value="" disabled>
              Select a hotel
            </option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Room Number
          </label>
          <Input
            value={roomNumber}
            onChange={(event) => setRoomNumber(event.target.value)}
            disabled={!isCreateMode}
            className="text-gray-900"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Type</label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as RoomType)}
            className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm text-gray-900"
          >
            {ROOM_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Price</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="text-gray-900"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Capacity</label>
          <Input
            type="number"
            min="1"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            className="text-gray-900"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Floor</label>
          <Input
            type="number"
            value={floor}
            onChange={(event) => setFloor(event.target.value)}
            className="text-gray-900"
          />
        </div>
        {isCreateMode ? (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-900">
              Quantity
            </label>
            <Input
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="text-gray-900"
            />
          </div>
        ) : null}

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-gray-900">
            Amenities (comma separated)
          </label>
          <Input
            value={amenities}
            onChange={(event) => setAmenities(event.target.value)}
            placeholder="WiFi, AC, TV"
            className="text-gray-900"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-gray-900">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-24 resize-none text-gray-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Availability
          </label>
          <select
            value={String(isAvailable)}
            onChange={(event) => setIsAvailable(event.target.value === "true")}
            className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm text-gray-900"
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Image (optional)
          </label>
          <Input
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="text-gray-900"
          />
          {previewUrl ? (
            <div className="relative mt-2 inline-block">
              <img
                src={previewUrl}
                alt="Selected room"
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

        {error ? (
          <p className="text-sm text-red-600 md:col-span-2">{error}</p>
        ) : null}
      </form>
    </AppModal>
  );
}
