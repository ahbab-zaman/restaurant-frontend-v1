"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useCreateHotelMutation, useDeleteHotelMutation, useHotelsQuery, useUpdateHotelMutation } from "@/lib/hotels/hotels.query";
import { apiError } from "@/lib/auth/api-client";
import { Hotel, HotelMutationPayload } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";
import HotelFormModal from "./HotelFormModal";
import HotelsTable from "./HotelsTable";
import LoadingSpinner from "./LoadingSpinner";
import HotelDetailsModal from "./HotelDetailsModal";

type HotelsDashboardProps = {
  title: string;
  description: string;
};

export default function HotelsDashboard({ title, description }: HotelsDashboardProps) {
  const { data, isLoading, isFetching } = useHotelsQuery();
  const createMutation = useCreateHotelMutation();
  const updateMutation = useUpdateHotelMutation();
  const deleteMutation = useDeleteHotelMutation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingHotel, setViewingHotel] = useState<Hotel | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [deletingHotel, setDeletingHotel] = useState<Hotel | null>(null);

  const hotels = useMemo(() => data?.items ?? [], [data?.items]);

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

      {isLoading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
          <LoadingSpinner className="h-8 w-8 text-zinc-600" />
        </div>
      ) : hotels.length ? (
        <div className="space-y-3">
          {isFetching ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <LoadingSpinner className="h-4 w-4" /> Syncing latest data...
            </div>
          ) : null}
          <HotelsTable hotels={hotels} onView={setViewingHotel} onEdit={setEditingHotel} onDelete={setDeletingHotel} />
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
