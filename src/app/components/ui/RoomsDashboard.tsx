"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useAuthUser } from "@/lib/auth/auth.query";
import { apiError } from "@/lib/auth/api-client";
import { useHotelsQuery } from "@/lib/hotels/hotels.query";
import { useCreateRoomsMutation, useDeleteRoomMutation, useRoomsByHotelsQuery, useUpdateRoomMutation } from "@/lib/rooms/rooms.query";
import { Button } from "@/components/ui/button";
import { CreateRoomPayload, Room, RoomFilters, UpdateRoomPayload } from "@/types/room";
import ConfirmationModal from "./ConfirmationModal";
import LoadingSpinner from "./LoadingSpinner";
import RoomDetailsModal from "./RoomDetailsModal";
import RoomFormModal from "./RoomFormModal";
import RoomsTable from "./RoomsTable";

type RoomsDashboardProps = {
  title: string;
  description: string;
};

export default function RoomsDashboard({ title, description }: RoomsDashboardProps) {
  const user = useAuthUser();
  const canManage = user?.role === "HOTEL_ADMIN" || user?.role === "SUPER_ADMIN";

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
  const [filters, setFilters] = useState<RoomFilters>({ type: "", isAvailable: "" });

  const { data: hotelsData, isLoading: isHotelsLoading } = useHotelsQuery();
  const hotels = useMemo(() => hotelsData?.items ?? [], [hotelsData?.items]);
  const hotelIds = useMemo(() => hotels.map((hotel) => hotel.id), [hotels]);

  const { data: roomsData, isLoading: isRoomsLoading, isFetching } = useRoomsByHotelsQuery(hotelIds, filters);

  const rooms = useMemo(() => {
    const hotelById = new Map(hotels.map((hotel) => [hotel.id, hotel]));
    return (roomsData?.items ?? []).map((room) => ({
      ...room,
      hotel: hotelById.get(room.hotelId),
    }));
  }, [roomsData?.items, hotels]);

  const createMutation = useCreateRoomsMutation();
  const updateMutation = useUpdateRoomMutation();
  const deleteMutation = useDeleteRoomMutation();

  async function onCreate(payload: CreateRoomPayload | UpdateRoomPayload) {
    try {
      await createMutation.mutateAsync(payload as CreateRoomPayload);
      toast.success("Rooms created successfully");
      setIsCreateOpen(false);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to create rooms";
      toast.error(message);
    }
  }

  async function onUpdate(payload: CreateRoomPayload | UpdateRoomPayload) {
    if (!editingRoom) return;

    try {
      await updateMutation.mutateAsync({
        hotelId: editingRoom.hotelId,
        roomId: editingRoom.id,
        payload: payload as UpdateRoomPayload,
      });
      toast.success("Room updated successfully");
      setEditingRoom(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update room";
      toast.error(message);
    }
  }

  async function onDelete() {
    if (!deletingRoom) return;

    try {
      await deleteMutation.mutateAsync({ hotelId: deletingRoom.hotelId, roomId: deletingRoom.id });
      toast.success("Room deleted successfully");
      setDeletingRoom(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to delete room";
      toast.error(message);
    }
  }

  const isLoading = isHotelsLoading || isRoomsLoading;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-zinc-600">{description}</p>
        </div>
        {canManage ? (
          <Button type="button" onClick={() => setIsCreateOpen(true)} disabled={!hotels.length}>
            <Plus className="mr-1 h-4 w-4" />
            Add Rooms
          </Button>
        ) : null}
      </div>

      <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-800">Filter by type</label>
          <select
            className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm text-gray-900"
            value={filters.type}
            onChange={(event) => setFilters((prev) => ({ ...prev, type: event.target.value as RoomFilters["type"] }))}
          >
            <option value="">All types</option>
            <option value="SINGLE">SINGLE</option>
            <option value="DOUBLE">DOUBLE</option>
            <option value="TWIN">TWIN</option>
            <option value="SUITE">SUITE</option>
            <option value="DELUXE">DELUXE</option>
            <option value="FAMILY">FAMILY</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-800">Filter by availability</label>
          <select
            className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm text-gray-900"
            value={filters.isAvailable}
            onChange={(event) => setFilters((prev) => ({ ...prev, isAvailable: event.target.value as RoomFilters["isAvailable"] }))}
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
          <LoadingSpinner className="h-8 w-8 text-zinc-600" />
        </div>
      ) : rooms.length ? (
        <div className="space-y-3">
          {isFetching ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <LoadingSpinner className="h-4 w-4" /> Syncing latest data...
            </div>
          ) : null}
          <RoomsTable rooms={rooms} canManage={canManage} onView={setViewingRoom} onEdit={setEditingRoom} onDelete={setDeletingRoom} />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-zinc-600">No rooms found.</p>
        </div>
      )}

      <RoomDetailsModal open={Boolean(viewingRoom)} room={viewingRoom} onClose={() => setViewingRoom(null)} />

      <RoomFormModal
        open={isCreateOpen}
        mode="create"
        hotels={hotels}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={onCreate}
        isLoading={createMutation.isPending}
      />

      <RoomFormModal
        open={Boolean(editingRoom)}
        mode="edit"
        room={editingRoom}
        hotels={hotels}
        onClose={() => setEditingRoom(null)}
        onSubmit={onUpdate}
        isLoading={updateMutation.isPending}
      />

      <ConfirmationModal
        open={Boolean(deletingRoom)}
        title="Delete Room"
        description="Are you sure you want to delete this room? This action cannot be undone."
        onClose={() => setDeletingRoom(null)}
        onConfirm={onDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
