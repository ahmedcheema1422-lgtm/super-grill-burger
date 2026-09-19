import logoImage from '../assets/logo.jpg'

const Navbar = ({ cartCount = 0, onCartToggle, onLoginClick, currentUser, onLogout }) => {
  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 40px',
        background: 'rgba(17, 17, 17, 0.3)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        className="nav-brand"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fff',
          fontWeight: 700,
          letterSpacing: '1px',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <div
          className="nav-brand-backdrop"
          style={{
            position: 'absolute',
            left: '10px',
            top: '-18px',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '2px',
            color: 'rgba(255, 45, 45, 0.22)',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          Super Grill Burger
        </div>

        <img
          className="nav-logo"
          src={logoImage}
          alt="Super Grill logo"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            border: '2px solid #ff2d2d',
            background: '#fff',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div
          className="nav-brand-text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span className="nav-brand-main" style={{ fontSize: '18px', textTransform: 'uppercase', fontStyle: 'italic', fontWeight: 800 }}>Super Grill Burger</span>
          <span
            style={{
              width: '100%',
              height: '3px',
              background: '#ff2d2d',
              borderRadius: '999px',
              marginTop: '2px',
            }}
          />
        </div>
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, gap: '12px' }}>
        <button
          type="button"
          className="nav-button nav-button--login"
          onClick={currentUser ? onLogout : onLoginClick}
          style={{
            background: 'transparent',
            border: '1.5px solid #ff6a00',
            color: '#ff6a00',
            borderRadius: '999px',
            padding: '9px 16px',
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: '0.5px',
            boxShadow: '0 0 0 1px rgba(255, 106, 0, 0.18)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff6a00'
            e.target.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#ff6a00'
          }}
        >
          {currentUser ? 'Logout' : 'Login'}
        </button>

        <button
          type="button"
          className="nav-button nav-button--cart"
          onClick={onCartToggle}
          style={{
            background: '#ff2d2d',
            border: 'none',
            color: '#fff',
            borderRadius: '999px',
            padding: '9px 16px',
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 18px rgba(255, 45, 45, 0.25)',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '14px' }}>🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-6px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '999px',
                background: '#fff',
                color: '#ff2d2d',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                border: '2px solid #ff2d2d',
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
