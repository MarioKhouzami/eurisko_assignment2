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
    <div className="shadow-lg rounded-lg p-6 m-4 shadow-gray-300">
      <div className="flex justify-center items-center">
        <h1 className=" w-16 h-16 flex items-center justify-center bg-[#3251D0] text-white text-2xl font-bold rounded-full">
          {user_initial}
        </h1>
      </div>
      <h1 className="text-lg text-gray-800">{name}</h1>
      <p className="text-gray-500 text-[14px]">Email: {email}</p>
      <p className="text-gray-500 text-[14px]">Status: {status}</p>
      <p className="text-gray-500 text-[14px]">
        Date Of Birth: {date_of_birth}
      </p>
      <div className="flex justify-end mt-2">
        <button className="bg-[#3251D0] text-white pl-3 pr-3 pt-[2px] pb-[2px] mr-3 rounded-[5px] hover:bg-white hover:text-[#3251D0] hover:font-medium">
          Edit
        </button>
        <button className="bg-red-500 text-white pl-3 pr-3 pt-[2px] pb-[2px] rounded-[5px] hover:bg-white hover:text-red-500 hover:font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};
