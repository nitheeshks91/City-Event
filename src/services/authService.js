// Mock auth service - replace with real API calls
export async function loginApi({ email, password }) {
  // simulate
  await new Promise((r) => setTimeout(r, 700));
  if (email && password) return { token: `token:${email}${password}` };
  throw new Error('Invalid credentials');
}

export async function signupApi({ email, password }) {
  await new Promise((r) => setTimeout(r, 700));
  if (email && password) return { token: `token:${email}${password}` };
  throw new Error('Signup failed');
}
