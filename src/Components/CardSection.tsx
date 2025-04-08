type Props = {
  children: React.ReactNode;
};
const CardSection = ({ children }: Props) => {
  return <div className="card-sec">{children}</div>;
};

export default CardSection;
