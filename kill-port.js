

// Script to kill processes on port 5000
const { exec } = require('child_process');

const port = 5000;

console.log(`Attempting to kill processes on port ${port}...`);

// For Unix-like systems (Linux, macOS)
exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
  if (error) {
    console.log(`No processes found on port ${port} or already killed`);
  } else {
    console.log(`Successfully killed processes on port ${port}`);
  }
  
  // For Windows systems
  exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
    if (stdout) {
      const lines = stdout.split('\n');
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid)) {
            exec(`taskkill /PID ${pid} /F`, (killError) => {
              if (!killError) {
                console.log(`Killed Windows process ${pid} on port ${port}`);
              }
            });
          }
        }
      });
    }
  });
});
