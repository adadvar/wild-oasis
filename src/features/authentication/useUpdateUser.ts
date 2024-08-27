import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClinet = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");

      queryClinet.setQueryData(["user"], user)
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateUser }
}