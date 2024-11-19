import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import React from "react";
import { BiEnvelope, BiPhone } from "react-icons/bi";

type ImageProps = {
  src: string;
  alt?: string;
};

type LinkProps = {
  label: string;
  url: string;
};

type Map = {
  url: string;
  image: ImageProps;
};

type Contact = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: LinkProps;
  button?: ButtonProps;
};

type Props = {
  heading: string;
  description: string;
  contacts: Contact[];
  map: Map;
};

export type Contact14Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Contact14 = (props: Contact14Props) => {
  const { heading, description, contacts, map } = {
    ...Contact14Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 text-black">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="md:text-md lg:max-w-[80%] max-w-[95%]">{description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-20 md:gap-y-16">
          <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-10">
            {contacts.map((contact, index) => (
              <div key={index}>
                <div className="mb-3 md:mb-4">{contact.icon}</div>
                <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">{contact.title}</h3>
                <p className="mb-2">{contact.description}</p>
                {contact.title === "Office" && contact.button ? (
                  <div className="mt-5 md:mt-6">
                    <Button {...contact.button}>{contact.button.title}</Button>
                  </div>
                ) : (
                  contact.link && (
                    <a className="underline" href={contact.link.url}>
                      {contact.link.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
          {/* insert your map code here */}
          <a href={map.url} className="justify-self-end md:w-[321.6px] lg:w-auto">
            <img
              src={map.image.src}
              alt={map.image.alt}
              className="size-full h-[400px] object-cover md:h-[516px] "
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact14;

export const Contact14Defaults: Contact14Props = {
  heading: "Kom in contact",
  description: "Heeft u vragen of wilt u meer informatie? Neem dan gerust contact met ons op.",
  contacts: [
    {
      icon: <BiEnvelope className="size-8" />,
      title: "Email",
      description: "",
      link: {
        label: "jv-nathanael@gmail.com",
        url: "#",
      },
    },
    {
      icon: <BiPhone className="size-8" />,
      title: "Bestuur",
      description: "Wim Huijser",
    },
  ],
  map: {
    url: "#",
    image: {
      src: "https://relume-assets.s3.us-east-1.amazonaws.com/placeholder-map-image.svg",
      alt: "Relume placeholder map image",
    },
  },
};
