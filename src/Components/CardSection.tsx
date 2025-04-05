type Props = {
  children: React.ReactNode;
};
const CardSection = ({ children }: Props) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export default CardSection;
