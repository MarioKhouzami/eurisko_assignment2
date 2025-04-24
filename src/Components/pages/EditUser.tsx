import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import NavBar from "../organisms/NavBar/NavBar";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: z.enum(["active", "inactive"]),
});

type UserFormData = z.infer<typeof userSchema>;

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // ✅ Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load user");
      return data.data.user;
    },
    enabled: !!token && !!id,
    onSuccess: (data) => {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        status: data.status,
      });
    },
  });

  // ✅ Submit update
  const mutation = useMutation({
    mutationFn: async (formData: UserFormData) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");
      return data;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Update failed");
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <NavBar />
      <div className="outter-form">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="main-form">
            <h2 className="form-header">Edit User</h2>

            <div>
              <label className="input-header">First Name *</label>
              <input {...register("firstName")} className="form-input" />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="input-header">Last Name (optional)</label>
              <input {...register("lastName")} className="form-input" />
            </div>

            <div>
              <label className="input-header">Email *</label>
              <input
                type="email"
                {...register("email")}
                className="form-input"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="input-header">Date of Birth *</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="form-input"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label className="input-header">Status *</label>
              <select {...register("status")} className="form-input">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update User"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;
