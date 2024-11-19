import BestuurTable, { tableData } from "./BestuurTable";

type Props = {
  heading: string;
};

export type Content7Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Content7 = (props: Content7Props) => {
  const { heading } = props;
  
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto w-full max-w-lg">
          <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <BestuurTable rows={tableData} />
        </div>
      </div>
    </section>
  );
};

export default Content7;
