import app from './app';
import { env } from './config/environment';

const port = env.PORT;

console.log('🚀 Starting server...');
console.log(`📡 Port: ${port}`);
console.log(`🗄️  Database: ${env.DATABASE_URL.replace(/:[^:]+@/, ':***@')}`);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}).on('error', (err) => {
  console.error('❌ Error starting server:', err);
});
