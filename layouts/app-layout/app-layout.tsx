import Footer from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
