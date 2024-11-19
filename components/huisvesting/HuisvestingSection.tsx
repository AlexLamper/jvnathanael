type ImageProps = {
  src: string;
  alt?: string;
};

type CardBaseProps = {
  image: ImageProps;
  heading: string;
  description: string;
};

type CardsSmallProps = CardBaseProps;

type CardBigProps = CardBaseProps;

type Props = {
  tagline: string;
  heading: string;
  description: string;
  cardsSmall: CardsSmallProps[];
  cardBig: CardBigProps;
};

export type HuisvestingSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const HuisvestingSection = (props: HuisvestingSectionProps) => {
  const { tagline, heading, description, cardsSmall, cardBig } = {
    ...HuisvestingSectionDefaults,
    ...props,
  } as Props;

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 text-black">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-4 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            <div className="order-first flex flex-col items-stretch border border-black border-opacity-60 border-border-primary lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
              <div>
                <img
                  src={cardBig.image.src}
                  alt={cardBig.image.alt}
                  className="w-full object-cover"
                />
              </div>
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <h3 className="mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-3xl lg:text-4xl">
                    {cardBig.heading}
                  </h3>
                  <p>{cardBig.description}</p>
                </div>
              </div>
            </div>
            {cardsSmall.map((card, index) => (
              <div
                key={index}
                className="order-last flex flex-col border border-black border-opacity-60 border-border-primary md:grid md:grid-cols-2 lg:order-none"
              >
                <div className="flex w-full items-center justify-center">
                  <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                </div>
                <div className="block flex-col justify-center p-6 md:flex">
                  <div>
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">{card.heading}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: card.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HuisvestingSection;

export const HuisvestingSectionDefaults: HuisvestingSectionProps = {
  heading: "Huisvesting",
  description: "Onze samenkomsten vinden plaats in de Rehobôthkerk in Sommelsdijk.",
  cardsSmall: [
    {
      image: {
        src: "/images/huisvesting/hhk-plattegrond.jpg",
        alt: "Relume placeholder image 1",
      },
      heading: "Locatie/gegevens",
      description: `
        Rehobôthkerk<br />
        Olympiaweg 44<br />
        3245 DL Sommelsdijk<br />
        Tel. 0187-486595<br />
        <a href="http://www.hhgmiddelharnis.nl" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">
            www.hhgmiddelharnis.nl
        </a>
        `,
    },
    {
      image: {
        src: "/images/huisvesting/rehobothkerk.jpg",
        alt: "Relume placeholder image 2",
      },
      heading: "Kerkgebouw",
      description: `
        Het kerkgebouw is gelegen aan de Olympiaweg 44 te Sommelsdijk.
        `,
    },
  ],
  cardBig: {
    image: {
      src: "/images/huisvesting/hhk-luchtopname.jpg",
      alt: "Relume placeholder image 3",
    },
    heading: "Routebeschrijving",
    description: `
        Komend vanaf Rotterdam of Zierikzee via Oude Tonge, volgt u de borden Middelharnis.
        Bij Middelharnis neemt u een halve rotonde richting centrum Middelharnis,
        dan direct na 100 mtr. linksaf rijdt u op de Olympiaweg.Komend vanaf Ouddorp / Stellendam, volgt u de borden Middelharnis.
        Bij Middelharnis neemt u een driekwart rotonde richting centrum Middelharnis,
        dan direct na 100 mtr. linksaf rijdt u op de Olympiaweg.
        `,
  },
};
