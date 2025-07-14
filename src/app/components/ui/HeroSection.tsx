import React from 'react';
import BearSVG from '../svg/bear';
import { ContactForm } from './ContactForm';

export function HeroSection() {
    return (
        <div className="flex flex-col items-start md:items-center justify-center min-h-[80vh] gap-3 px-4 md:px-0">
            <div className="text-foreground transition-colors self-start md:self-center">
                <BearSVG />
            </div>
            <h1 className="text-[14px] xl:text-[20px] text-foreground font-suisse w-full md:w-[50vw] text-left md:text-pretty md:text-center max-w-[700px]">
                Anush Gopalakrishnan is a web designer and no-code web developer based in Bangalore, India. 
                His work is focused on the meticulous crafting of distinctive and impactful web experiences.
            </h1>
            <ContactForm />
        </div>
    );
} 