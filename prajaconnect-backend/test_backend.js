fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@prajaconnect.com', password: 'test' })
}).then(async r => {
    console.log("Status:", r.status);
    console.log("Body:", await r.text());
}).catch(console.error);
