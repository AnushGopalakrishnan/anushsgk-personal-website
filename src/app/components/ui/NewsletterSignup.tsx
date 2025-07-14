'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { submitNewsletter } from '@/lib/newsletter';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitNewsletter(email);
      toast.success('Successfully signed up for the newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to sign up for newsletter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background rounded-md p-4 md:p-6 shadow flex flex-col max-w-[90vw] md:max-w-xl ml-4 mt-10 mb-4 border border-foreground/20">
      <h2 className="text-xl md:text-2xl text-foreground mb-4" style={{ fontFamily: '"Graphik Medium", "Graphik Medium Placeholder", sans-serif', fontSize: '20px', lineHeight: '1.4em' }}>
        Sign up to my newsletter. No spam, promise.
      </h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to keep up"
                  className="w-full bg-transparent outline-none text-foreground placeholder-foreground/60 pl-10 pr-3 py-2 rounded-[10px] text-xs font-mono"
                  aria-label="Email address"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-foreground text-background text-sm font-medium rounded-[10px] py-2 transition focus:outline-none focus:ring-2 focus:ring-[rgb(124,158,191)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: '14px', fontWeight: '500' }}
        >
          {isSubmitting ? 'Signing up...' : 'Submit'}
        </button>
      </form>
      <p className="mt-4 text-foreground text-sm" style={{ fontFamily: '"Geist Regular", "Geist Regular Placeholder", sans-serif', fontSize: '14px', lineHeight: '1.4em' }}>
        I like to talk about design, development, philosophy, finance, and anything else that I really just find interesting.
      </p>
    </div>
  );
};

export default NewsletterSignup; 