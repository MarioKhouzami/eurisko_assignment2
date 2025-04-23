import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { Card } from "../molecules/Card/card";
import SearchInput from "../molecules/SearchInput/SearchInput";
import CardsContainer from "../organisms/CardsContainer/CardsContainer";
import NavBar from "../organisms/NavBar/NavBar";
import Loading from "../organisms/Loading/Loading";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  status: string;
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    data: users = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const url = search
        ? `/api/users?search=${encodeURIComponent(search)}`
        : "/api/users";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return data.result.data.users;
    },
    enabled: !!accessToken,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <div className="min-h-screen dark:bg-primary-dark">
      <NavBar />
      <SearchInput onSearch={handleSearch} />

      {loading && <Loading />}

      {!loading && isError && (
        <p className="error-msg">{(error as Error).message}</p>
      )}

      {!loading && !isError && users.length === 0 && (
        <p className="user-nf">User Not Found</p>
      )}

      {!loading && !isError && users.length > 0 && (
        <CardsContainer>
          {users.map((user: User) => (
            <Card
              key={user.id}
              email={user.email}
              name={`${user.firstName} ${
                user.lastName ? " " + user.lastName : ""
              }`}
              date_of_birth={user.dateOfBirth}
              initial={`${user.firstName[0]}${
                user.lastName ? user.lastName[0] : ""
              }`}
              status={user.status}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  );
};

export default Dashboard;
