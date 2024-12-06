import { mainEndpoint } from "../../utils/endpoints";

export const sendEmail = async (bugTitle: string, bugDescription: string) => {
    try {
        const response = await fetch(`${mainEndpoint}/support/new/bug`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({bugTitle, bugDescription}),
        });
        const data = await response.json();
        if (data.success) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
    } catch (error) {
        console.error('Error:', error)
        alert('An error occurred.');
    }
};

export const fetchForgotPassword = async (email: string) => {
    try { 
        const response = await fetch(`${mainEndpoint}/support/forgot/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error)
        alert(error);
    }
}