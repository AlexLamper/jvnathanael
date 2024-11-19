import { ButtonProps } from "@relume_io/relume-ui";

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
};

export type Cta25Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta25 = (props: Cta25Props) => {
  const { description } = {
    ...Cta25Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 flex items-center justify-center">
        <div className="container max-w-3xl text-center mx-auto">
            <p className="md:text-md text-black">{description}</p>
        </div>
    </section>
  );
};

export default Cta25;

export const Cta25Defaults: Cta25Props = {
  description:
    "Naast deze zondagavonden waarin de Bijbel centraal staat, worden er ook regelmatig activiteiten georganiseerd op de vrijdag- of zaterdagavond. Dit kan variëren van een gourmetavond tot een sportavond. Dit alles om de onderlinge band te verstevigen. Ook wordt er elk jaar een jeugdweekend georganiseerd. We hopen dat JV Nathánaël een middel mag zijn in de hand van God tot bekering van ons hart. Moge Hij ons trekken uit de duisternis van de zonde tot Zijn eeuwig en wonderbaar Licht! - Het bestuur",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
};