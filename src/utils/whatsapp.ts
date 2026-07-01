
export const WHATSAPP_NUMBER = "919747838663"; // Derived from +91 97478 38663
export const CALL_NUMBER = "+919747838663";

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const templates = {
  general: `Hello,
I would like to know more about your interior design services.`,

  quote: (service: string) => `Hello,
I would like a quote for ${service}.
Please share more details.`,

  similarDesign: `Hello,
I saw a project on your website and would like a similar design for my home or office.
Please contact me.`,

  projectInquiry: (projectName: string) => `Hello,
I am interested in a design similar to the "${projectName}" project.
Please share more details.`,

  consultation: `Hello,
I would like to schedule a free design consultation.`,

  formInquiry: (data: {
    name: string;
    phone: string;
    projectType: string;
    location: string;
    message: string;
  }) => `Hello,

My Name: ${data.name}
Phone Number: ${data.phone}
Project Type: ${data.projectType}
Location: ${data.location}
Message: ${data.message}

I would like to discuss my project.`
};
