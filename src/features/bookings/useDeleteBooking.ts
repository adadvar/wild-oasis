import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient()
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success('Booking deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: err => toast.error(err.message),
  })

  return { deleteBooking, isDeleting }
}