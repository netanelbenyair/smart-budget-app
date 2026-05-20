import './App.css'
import Dashboard from './components/Dashboard'
import AI from './components/AI' // 1. מייבאים את הקומפוננטה החדשה

function App() {
  return (
    // הוספתי קצת סטיילינג לקונטיינר הראשי כדי שייראה טוב במרכז
    <div className="app-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>המערכת הפיננסית שלי 💰</h1>
      
      {/* 2. מציגים את ה-Dashboard עם הקופסאות */}
      <Dashboard/>
      
      {/* 3. מציגים את הצ'אט של ה-AI מתחת */}
      <AI />
    </div>
  )
}

export default App;