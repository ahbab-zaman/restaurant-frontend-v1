"use client";

import { motion } from "framer-motion";
import { Delete, Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Hotel } from "@/types/hotel";

type HotelsTableProps = {
  hotels: Hotel[];
  onView: (hotel: Hotel) => void;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
};

export default function HotelsTable({
  hotels,
  onView,
  onEdit,
  onDelete,
}: HotelsTableProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Added By</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell>
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="h-12 w-16 rounded-md border border-zinc-200 object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-zinc-900">
                {hotel.name}
              </TableCell>
              <TableCell className="max-w-xs truncate text-zinc-600">
                {hotel.address}
              </TableCell>
              <TableCell className="text-zinc-600">
                {hotel.admin?.name ?? "N/A"}
              </TableCell>
              <TableCell className="text-zinc-600">
                {new Date(hotel.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onView(hotel)}
                    aria-label={`View ${hotel.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onEdit(hotel)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => onDelete(hotel)}
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
