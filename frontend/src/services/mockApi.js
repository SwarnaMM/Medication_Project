// // Intercepts fetch() calls and returns fake responses for testing frontend only.

// export function enableMockAPI() {
//   const originalFetch = window.fetch;

//   window.fetch = async (url, options = {}) => {
//     // --- MOCK: GET /medications ---
//     if (url.endsWith('/medications') && (!options.method || options.method === 'GET')) {
//       return mockResponse([
//         { id: '1', name: 'Paracetamol', instructions: 'After food', is_active: true },
//         { id: '2', name: 'Ibuprofen', instructions: '', is_active: true },
//       ]);
//     }

//     // --- MOCK: POST /medications ---
//     if (url.endsWith('/medications') && options.method === 'POST') {
//       const body = JSON.parse(options.body);
//       return mockResponse({
//         id: String(Date.now()),
//         ...body,
//         is_active: true
//       });
//     }

//     // --- MOCK: GET /doses/upcoming ---
//     if (url.endsWith('/doses/upcoming')) {
//       return mockResponse([
//         {
//           id: 'd1',
//           medication_id: '1',
//           medication_name: 'Paracetamol',
//           dose_time: new Date().toISOString(),
//           taken: false
//         }
//       ]);
//     }

//     // --- MOCK: POST /doses/:id/taken ---
//     if (url.includes('/doses/') && url.endsWith('/taken')) {
//       return mockResponse({
//         id: url.split('/').slice(-2)[0],
//         taken: true,
//         taken_at: new Date().toISOString()
//       });
//     }

//     return originalFetch(url, options);
//   };
// }

// function mockResponse(data) {
//   return Promise.resolve({
//     ok: true,
//     status: 200,
//     json: async () => data
//   });
// }
