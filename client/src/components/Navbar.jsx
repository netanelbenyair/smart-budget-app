import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px', 
      padding: '15px', 
      backgroundColor: '#333', 
      color: 'white',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        🏠 דף הבית
      </Link>
      <Link to="/ledger" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        📜 היסטוריית פעולות
      </Link>
      <Link to="/savings" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        🎯 יעדי חיסכון
      </Link>
    </nav>
  );
};

export default Navbar;