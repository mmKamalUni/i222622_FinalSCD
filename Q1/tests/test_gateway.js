const base = 'http://localhost:4000';
const timeout = (ms) => new Promise(r => setTimeout(r, ms));

async function req(path, opts) {
  const res = await fetch(base + path, opts);
  const text = await res.text();
  return { status: res.status, body: text };
}

async function run() {
  console.log('Waiting for services to start...');
  await timeout(2000);

  console.log('\n1) Gateway health');
  console.log(await req('/health'));

  console.log('\n2) Auth register -> POST /auth/register');
  console.log(await req('/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'a@b.com', password: 'x', role: 'patient' }) }));

  console.log('\n3) Auth login -> POST /auth/login');
  console.log(await req('/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'a@b.com' }) }));

  console.log('\n4) Get users via gateway -> GET /users');
  console.log(await req('/users'));

  console.log('\n5) Get doctors via gateway -> GET /doctors');
  console.log(await req('/doctors'));

  console.log('\n6) Create appointment -> POST /appointments (will trigger internal notification)');
  console.log(await req('/appointments', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ userId: 1, doctorId: 1, date: '2026-01-06' }) }));

  console.log('\n7) List appointments -> GET /appointments');
  console.log(await req('/appointments'));

  console.log('\nAPI Gateway tests finished');
}

run().catch(err => { console.error('Test failed', err); process.exit(2); });
