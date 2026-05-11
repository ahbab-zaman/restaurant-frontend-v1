"use client";

import { useMemo, useState } from "react";
import { useAuthUser } from "@/lib/auth/auth.query";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useCreateHotelMutation, useDeleteHotelMutation, useHotelsQuery, useUpdateHotelMutation } from "@/lib/hotels/hotels.query";
import { useRoomsByHotelsQuery } from "@/lib/rooms/rooms.query";
import { apiError } from "@/lib/auth/api-client";
import { Hotel, HotelMutationPayload } from "@/types/hotel";
import { Room } from "@/types/room";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConfirmationModal from "@/app/components/ui/modals/ConfirmationModal";
import HotelFormModal from "@/app/components/ui/modals/HotelFormModal";
import HotelsTable from "@/app/components/ui/tables/HotelsTable";
import LoadingSpinner from "@/app/components/ui/common/LoadingSpinner";
import HotelDetailsModal from "@/app/components/ui/modals/HotelDetailsModal";
import PremiumPagination from "@/app/components/ui/common/PremiumPagination";

type HotelsDashboardProps = {
  title: string;
  description: string;
};

export default function HotelsDashboard({ title, description }: HotelsDashboardProps) {
  const user = useAuthUser();
  // Hotel managers should only see and manage their own hotels in the dashboard.
  const isHotelManager = user?.role === "HOTEL_ADMIN";

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "address" | "rooms" | "createdAt">("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const limit = 10;
  const { data, isLoading, isFetching } = useHotelsQuery({ page, limit, myHotels: isHotelManager });
  const createMutation = useCreateHotelMutation();
  const updateMutation = useUpdateHotelMutation();
  const deleteMutation = useDeleteHotelMutation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingHotel, setViewingHotel] = useState<(Hotel & { rooms: Room[] }) | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [deletingHotel, setDeletingHotel] = useState<Hotel | null>(null);

  const hotels = useMemo(() => data?.items ?? [], [data?.items]);
  const hotelIds = useMemo(() => hotels.map((hotel) => hotel.id), [hotels]);
  const { data: roomsData, isLoading: isRoomsLoading, isFetching: isRoomsFetching } = useRoomsByHotelsQuery(hotelIds);

  const hotelsWithRooms = useMemo(() => {
    const groupedRooms = new Map<string, Room[]>();
    for (const room of roomsData?.items ?? []) {
      const existing = groupedRooms.get(room.hotelId) ?? [];
      existing.push(room);
      groupedRooms.set(room.hotelId, existing);
    }

    return hotels.map((hotel) => ({
      ...hotel,
      rooms: groupedRooms.get(hotel.id) ?? [],
    }));
  }, [hotels, roomsData?.items]);

  const filteredAndSortedHotels = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = query
      ? hotelsWithRooms.filter((hotel) => {
          const searchableText = [
            hotel.name,
            hotel.address,
            hotel.admin?.name ?? "",
            ...hotel.rooms.map((room) => `${room.roomNumber} ${room.type}`),
          ]
            .join(" ")
            .toLowerCase();
          return searchableText.includes(query);
        })
      : hotelsWithRooms;

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "address") {
        comparison = a.address.localeCompare(b.address);
      } else if (sortBy === "rooms") {
        comparison = a.rooms.length - b.rooms.length;
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [hotelsWithRooms, searchTerm, sortBy, sortDirection]);

  async function onCreate(payload: HotelMutationPayload) {
    try {
      await createMutation.mutateAsync(payload);
      toast.success("Hotel created successfully");
      setIsCreateOpen(false);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to create hotel";
      toast.error(message);
    }
  }

  async function onUpdate(payload: HotelMutationPayload) {
    if (!editingHotel) return;
    try {
      await updateMutation.mutateAsync({ id: editingHotel.id, payload });
      toast.success("Hotel updated successfully");
      setEditingHotel(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update hotel";
      toast.error(message);
    }
  }

  async function onDelete() {
    if (!deletingHotel) return;
    try {
      await deleteMutation.mutateAsync(deletingHotel.id);
      toast.success("Hotel deleted successfully");
      setDeletingHotel(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to delete hotel";
      toast.error(message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-zinc-600">{description}</p>
        </div>
        <Button type="button" onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Hotel
        </Button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by hotel, address, admin, room..."
          className="sm:col-span-2"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as "name" | "address" | "rooms" | "createdAt")}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        >
          <option value="createdAt">Sort: Created Date</option>
          <option value="name">Sort: Hotel Name</option>
          <option value="address">Sort: Address</option>
          <option value="rooms">Sort: Room Count</option>
        </select>
        <select
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value as "asc" | "desc")}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        >
          <option value="desc">Order: Descending</option>
          <option value="asc">Order: Ascending</option>
        </select>
      </div>

      {isLoading || isRoomsLoading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
          <LoadingSpinner className="h-8 w-8 text-zinc-600" />
        </div>
      ) : hotelsWithRooms.length ? (
        <div className="space-y-3">
          {isFetching || isRoomsFetching ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <LoadingSpinner className="h-4 w-4" /> Syncing latest data...
            </div>
          ) : null}
          {filteredAndSortedHotels.length ? (
            <HotelsTable
              hotels={filteredAndSortedHotels}
              onView={setViewingHotel}
              onEdit={setEditingHotel}
              onDelete={setDeletingHotel}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
              <p className="text-zinc-600">No hotels match your search.</p>
            </div>
          )}
          <div className="flex justify-end">
            <PremiumPagination page={page} totalPages={data?.meta.totalPages ?? 1} onPageChange={setPage} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-zinc-600">No hotels found.</p>
        </div>
      )}

      <HotelDetailsModal open={Boolean(viewingHotel)} hotel={viewingHotel} onClose={() => setViewingHotel(null)} />

      <HotelFormModal
        open={isCreateOpen}
        mode="create"
        onClose={() => setIsCreateOpen(false)}
        onSubmit={onCreate}
        isLoading={createMutation.isPending}
      />

      <HotelFormModal
        open={Boolean(editingHotel)}
        mode="edit"
        hotel={editingHotel}
        onClose={() => setEditingHotel(null)}
        onSubmit={onUpdate}
        isLoading={updateMutation.isPending}
      />

      <ConfirmationModal
        open={Boolean(deletingHotel)}
        title="Delete Hotel"
        description="Are you sure you want to delete this hotel? This action cannot be undone."
        onClose={() => setDeletingHotel(null)}
        onConfirm={onDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
