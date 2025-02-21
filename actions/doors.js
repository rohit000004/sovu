
const DOMAIN = "http://localhost:3000"

export const adminSignin = async user => {
    try {
        const response = await fetch(`${DOMAIN}/api/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};