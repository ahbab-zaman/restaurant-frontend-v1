"use client";

import { motion } from "framer-motion";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Room } from "@/types/room";

type RoomsTableProps = {
  rooms: Room[];
  canManage: boolean;
  onView: (room: Room) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
};

export default function RoomsTable({ rooms, canManage, onView, onEdit, onDelete }: RoomsTableProps) {
  return (
    <motion.div
      className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amenities</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id} className="transition-colors hover:bg-zinc-50">
              <TableCell>
                {room.imageUrl ? (
                  <img src={room.imageUrl} alt={`Room ${room.roomNumber}`} className="h-12 w-16 rounded-md border border-zinc-200 object-cover" />
                ) : (
                  <div className="flex h-12 w-16 items-center justify-center rounded-md border border-dashed border-zinc-300 text-xs text-zinc-500">No image</div>
                )}
              </TableCell>
              <TableCell className="font-medium text-zinc-900">{room.hotel?.name ?? "N/A"}</TableCell>
              <TableCell>{room.roomNumber}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>${room.price.toFixed(2)}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${room.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {room.isAvailable ? "Available" : "Unavailable"}
                </span>
              </TableCell>
              <TableCell className="max-w-56 truncate text-zinc-600">{room.amenities?.join(", ") || "-"}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="icon" onClick={() => onView(room)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {canManage ? (
                    <>
                      <Button type="button" variant="outline" size="icon" onClick={() => onEdit(room)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="destructive" size="icon" onClick={() => onDelete(room)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
