import React from 'react';

const NewsletterSignup = () => {
  return (
    <div className="bg-white rounded-md p-4 md:p-6 shadow flex flex-col max-w-[90vw] md:max-w-xl md:ml-8 ml-4 mt-10 mb-4 border border-black/10">
      <h2 className="text-xl md:text-2xl text-foreground mb-4" style={{ fontFamily: '"Graphik Medium", "Graphik Medium Placeholder", sans-serif', fontSize: '20px', lineHeight: '1.4em' }}>
        Sign up to my newsletter. No spam, promise.
      </h2>
      <form className="w-full flex flex-col gap-4">
        <div className="w-full">
          <label className="block w-full">
            
            <div className="relative">
              <div className="absolute inset-0 bg-[rgba(205,201,255,0.2)] rounded-[10px]"></div>
              <div className="relative bg-background rounded-[10px] border border-dotted border-[rgb(124,158,191)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(205,201,255,0.08)]">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50">
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="none">
                    <path d="M 1.25 4.75 C 1.25 3.645 2.145 2.75 3.25 2.75 L 12.75 2.75 C 13.855 2.75 14.75 3.645 14.75 4.75 L 14.75 11.25 C 14.75 12.355 13.855 13.25 12.75 13.25 L 3.25 13.25 C 2.145 13.25 1.25 12.355 1.25 11.25 Z" fill="transparent" strokeWidth="1.5" stroke="currentColor" className="text-foreground"></path>
                    <path d="M 1.25 5.5 L 8 9.5 L 14.75 5.5" fill="transparent" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Enter your email to keep up"
                  className="w-full bg-transparent outline-none text-black placeholder-foreground/60 pl-10 pr-3 py-2 rounded-[10px] text-xs font-mono"
                  aria-label="Email address"
                />
              </div>
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-foreground text-background text-sm font-medium rounded-[10px] py-2 transition focus:outline-none focus:ring-2 focus:ring-[rgb(124,158,191)] focus:ring-offset-2"
          style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: '14px', fontWeight: '500' }}
        >
          Submit
        </button>
      </form>
      <p className="mt-4 text-foreground text-sm" style={{ fontFamily: '"Geist Regular", "Geist Regular Placeholder", sans-serif', fontSize: '14px', lineHeight: '1.4em' }}>
        I like to talk about design, development, philosophy, finance, and anything else that I really just find interesting.
      </p>
    </div>
  );
};

export default NewsletterSignup; 