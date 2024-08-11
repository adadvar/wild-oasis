import { QueryClient, useMutation } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useCheckin = () => {
  const queryClient = new QueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }: { bookingId: number, breakfast: object }) => updateBooking(bookingId, {
      status: 'checked-in',
      isPaid: true,
      ...breakfast
    }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`)
      queryClient.invalidateQueries({ refetchType: 'active' })
      navigate('/')
    },
    onError: () => toast.error('There was an error while checking in'),
  })
  return { checkin, isCheckingIn }
}

export default useCheckin 