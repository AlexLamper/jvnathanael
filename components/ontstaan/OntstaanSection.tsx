type ImageProps = {
    src: string;
    alt?: string;
  };
  
  type Props = {
    heading: string;
    image: ImageProps;
    children: React.ReactNode;
  };
  
  export type Content1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;
  
  export const Content1 = (props: Content1Props) => {
    const { heading, children, image } = {
      ...Content1Defaults,
      ...props,
    } as Props;
    return (
      <section id="relume" className="lg:px-[5%] px-[1%] py-16 md:py-24 lg:py-28 text-black">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              <h2 className="rb-5 text-3xl font-bold md:mb-4 md:text-5xl lg:text-6xl lg:max-w-[80%] max-w-[95%]">
                {heading}
              </h2>
              <div className="prose mt-12">{children}</div>
            </div>
            <div>
              <img src={image.src} className="w-[70%] object-cover lg:ml-24" alt={image.alt} />
            </div>
          </div>
        </div>
      </section>
    );
  };

    export default Content1;
  
  export const Content1Defaults: Content1Props = {
    heading: "Het ontstaan van de HHK",
    children: (
      <div>
        <p>
            Na het ontstaan van de Hersteld Hervormde Kerk, was er in onze gemeente dringend behoefte aan jeugdwerk. Al snel kwamen we als jongeren bij elkaar in het toenmalige verenigingsgebouw &apos;Rehobôth&apos; aan de Kastanjelaan in Middelharnis. Het aantal deelnemers groeide in twee jaar uit tot ongeveer 40 personen.
        </p>
        <br />
        <p>
            Op 4 november 2006 werd de vereniging officieel opgericht. Zij staat onder verantwoordelijkheid van de jeugdraad, die op haar beurt onder toezicht van de kerkenraad valt. We moesten een nieuwe naam kiezen. Het is &apos;Nathánaël&apos; geworden, wat betekent: geschenk van God.
        </p>
        <br />
        <p>
            Ook vonden wij deze naam toepasselijk vanwege de link met het kerkblad &apos;Onder de Vijgenboom&apos; van de Hersteld Hervormde Gemeenten op Goeree–Overflakkee. De verenigingsavonden, sinds begin januari 2007 in de nieuw gebouwde Rehobôthkerk, vinden om de week plaats op zondagavond.
        </p>
      </div>
    ),
    image: {
      src: "/images/oprichting.jpg",
      alt: "Opriching van de Hersteld Hervormde Kerk",
    },
  };
  