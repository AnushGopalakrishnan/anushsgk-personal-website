'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { submitContact } from '@/lib/newsletter';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submit to contact API route for email sending
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }),
            });

            // Also submit to Google Apps Script for storing in sheets
            await submitContact(formData.name, formData.email, formData.message);

            if (response.ok) {
                toast.success('Message sent successfully!');
            } else {
                toast.success('Message stored successfully! (Email delivery may be delayed)');
            }
            
            setFormData({ name: '', email: '', message: '' });
            // Close the modal after successful submission
            const modal = document.getElementById('contact-modal') as HTMLDialogElement;
            modal?.close();
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="flex gap-4 mt-6 items-center border border-card-border hover:border-foreground rounded-lg px-[8px] py-[2px] transition-colors self-start md:self-center">
            <button
                onClick={() => {
                    const modal = document.getElementById('contact-modal') as HTMLDialogElement;
                    modal?.showModal();
                }}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
                <div className="relative">
                    <div className="w-4 h-4 bg-foreground/20 rounded-full"></div>
                    <div className="absolute top-0.75 left-0.75 w-2.5 h-2.5 bg-foreground rounded-full animate-[pulse_2s_cubic-bezier(0.25,1.01,0.69,0.42)_infinite]"></div>
                </div>
                <span className="font-suisse text-md text-foreground cursor-pointer">Available For Hire</span>
            </button>

            <dialog id="contact-modal" className="modal backdrop:bg-black/50">
                <div className="modal-box bg-background text-foreground border border-foreground/20 max-w-md w-full">
                    <h3 className="font-suisse text-lg font-bold mb-4">Get in Touch</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-suisse mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-foreground transition-colors"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-suisse mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-foreground transition-colors"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="block text-sm font-suisse mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-foreground transition-colors resize-none"
                            />
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    const modal = document.getElementById('contact-modal') as HTMLDialogElement;
                                    modal?.close();
                                }}
                                className="px-4 py-2 cursor-pointer border border-foreground/20 rounded-md text-foreground hover:bg-foreground/20 hover:text-primary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 cursor-pointer bg-foreground text-background rounded-md hover:bg-foreground/80 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
} 