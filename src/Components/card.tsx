type Props = {
  user_initial: string;
  name: string;
  email: string;
  status: string;
  date_of_birth: string;
};

export const Card = ({
  user_initial,
  name,
  email,
  status,
  date_of_birth,
}: Props) => {
  return (
    <div className="card-container">
      <div className="init-container">
        <h1 className="card-init">{user_initial}</h1>
      </div>
      <h1 className="card-username">{name}</h1>
      <p className="card-info">Email: {email}</p>
      <p className="card-info">Status: {status}</p>
      <p className="card-info">Date Of Birth: {date_of_birth}</p>
      <div className="buttons-cont">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};
