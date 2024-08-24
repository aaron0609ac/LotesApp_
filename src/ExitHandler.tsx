import { useEffect, useState } from 'react';

const ExitHandler = () => {
  const [logoutTimer, setLogoutTimer] = useState(null);

  // Function to reset the timer
  const resetTimer = () => {
    if (logoutTimer) {
      clearInterval(logoutTimer);
    }

    // Set a new timer (adjust the time as needed)
    const newLogoutTimer = setInterval(() => {
      // Add your logout or session expiration logic here
      window.location.href = '/page/LoginBiometric';
      clearInterval(newLogoutTimer);
    }, 60000); // 1 minute
if(typeof newLogoutTimer==='number')
    setLogoutTimer(newLogoutTimer);
  };

  useEffect(() => {
    // Set up the initial timer
    resetTimer();

    const handleExit = () => {
      // Clear the timer when the user exits the application
      if (logoutTimer) {
        clearInterval(logoutTimer);
      }
      
      // Add your logout or session expiration logic here
      localStorage.removeItem('authToken'); // Example: Clear session data
    };

    window.addEventListener('beforeunload', handleExit);

    return () => {
      // Remove the event listener and clear the timer when the component unmounts
      window.removeEventListener('beforeunload', handleExit);
      if (logoutTimer) {
        clearInterval(logoutTimer);
      }
    };
  }, [logoutTimer]);

  return null; // This component doesn't render anything
};

export default ExitHandler;