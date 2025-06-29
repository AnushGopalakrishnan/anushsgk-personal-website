import React from 'react';
import BearSVG from '../svg/bear';

export function HeroSection() {
    return (
        <div className="flex flex-col items-start md:items-center justify-center min-h-[80vh] gap-3 px-4 md:px-0">
            <div className="text-foreground transition-colors self-start md:self-center">
                <BearSVG />
            </div>
            <h1 className="text-[14px] xl:text-[20px] text-foreground font-suisse w-full md:w-[37vw] text-left md:text-center">
                Anush Gopalakrishnan is a web designer and no-code web developer based in Bangalore, India. 
                His work is focused on the meticulous crafting of distinctive and impactful web experiences.
            </h1>
            <div className="flex gap-4 mt-6 items-center border border-card-border hover:border-foreground rounded-lg px-[8px] py-[2px] transition-colors self-start md:self-center">
                <a 
                    href="mailto:hello@anushgopalakrishnan.com"
                    className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                >
                    <div className="relative">
                        <div className="w-4 h-4 bg-foreground/20 rounded-full"></div>
                        <div className="absolute top-0.75 left-0.75 w-2.5 h-2.5 bg-foreground rounded-full animate-[pulse_2s_cubic-bezier(0.25,1.01,0.69,0.42)_infinite]"></div>
                    </div>
                    <span className="font-suisse text-md text-foreground">Available For Hire</span>
                </a>
            </div>
        </div>
    );
} 