
// Fix: Import React to resolve 'Cannot find namespace React' error for ReactNode type
import React from 'react';

export interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  concern: string;
}