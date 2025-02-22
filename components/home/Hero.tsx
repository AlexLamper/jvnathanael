'use client';

import type { ButtonProps } from "@relume_io/relume-ui";
import SolidButton from "../common/BlueButton";
import OutlineButton from "../common/Transparentbutton";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  adminHeading: string;
  description: string;
  buttons: ButtonProps[];
  firstImage: ImageProps;
  secondImage: ImageProps;
  thirdImage: ImageProps;
};

export type Header127Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header127 = (props: Header127Props) => {
  const { heading, description, secondImage, thirdImage } = {
    ...Header127Defaults,
    ...props,
  } as Props;

  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Check if the user's role is admin
      const role = user.publicMetadata.role as string;
      setIsAdmin(role === "admin");
    }
  }, [user, isLoaded]);

  return (
    <section id="relume" className="lg:px-[5%] px-0 py-8 md:py-9 lg:py-10">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            {isLoaded ? (
              <h1 className="mb-5 text-4xl font-bold md:mb-4 md:text-6xl lg:text-7xl text-black">
                {heading} {isAdmin && <span className="text-xl text-gray-800">(Admin)</span>}
              </h1>
            ) : (
              "Loading..."
            )}
            <p
              className="md:text-md mt-12 text-black"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <SolidButton title="Activiteiten" url="/activiteiten" />
              <OutlineButton title="Contact" url="/contact" />
            </div>
          </div>
          <div className="relative flex w-full">
            <div className="lg:mx-[15%] w-full">
              <img
                src={secondImage.src}
                className="aspect-[2/3] size-full object-cover"
                alt={secondImage.alt}
              />
            </div>
            <div className="absolute bottom-auto left-auto right-0 top-[10%] w-[40%] opacity-90">
              <img
                src={thirdImage.src}
                className="aspect-square size-full object-cover border border-black rounded-full bg-opacity-25"
                alt={thirdImage.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header127;

export const Header127Defaults: Header127Props = {
  heading: "Jeugdvereniging Nathanaël",
  adminHeading: "Jeugdvereniging Nathanaël (Admin)",
  description:
    "Jeugdvereniging 'Nathánaël' is een christelijke jeugdvereniging voor jongeren van 15 jaar en ouder. De jeugdvereniging is verbonden met de Hersteld Hervormde Gemeente Middelharnis – Sommelsdijk. De verenigingsavonden vinden om de week plaats op zondagavond. <br><br> Na de middagdienst eten we eerst met elkaar, waarna het officiële gedeelte begint. Leden maken een inleiding aan de hand van een onderwerp uit de serie Bijbelstudies van het HHJO of over een vrij onderwerp. Verder houden we een aantal keren per jaar een preekbespreking of we nodigen een gastspreker uit. <br><br> Daarnaast maken we tijd vrij om te zingen. In ieder geval komt het allerbelangrijkste aan de orde: hoe kunnen we een rechtvaardig God ontmoeten? Kennis van God en Goddelijke zaken is allernoodzakelijkst!",
  secondImage: {
    src: "/images/hero1.jpg",
    alt: "JV nathanael hero image 1",
  },
  thirdImage: {
    src: "/images/geloof-hoop-liefde.jpg",
    alt: "Jv Nathanael hero image 2",
  },
};
