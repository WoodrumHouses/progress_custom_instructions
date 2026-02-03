import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { 
  homeIcon, 
  folderIcon, 
  logoutIcon 
} from '@progress/kendo-svg-icons';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { t } = useTranslation();
  const { logout, isAuthenticated } = useAuth();

  return (
    <aside className="sidebar" data-testid="sidebar-container-id">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Corticon</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          data-testid="nav-dashboard-link-id"
        >
          <SvgIcon icon={homeIcon} size="medium" />
          <span>{t('nav.dashboard')}</span>
        </NavLink>
        
        <NavLink 
          to="/projects" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          data-testid="nav-projects-link-id"
        >
          <SvgIcon icon={folderIcon} size="medium" />
          <span>{t('nav.projects')}</span>
        </NavLink>
      </nav>

      {isAuthenticated && (
        <div className="sidebar-footer">
          <Button 
            onClick={logout}
            fillMode="flat"
            svgIcon={logoutIcon}
            data-testid="logout-button-id"
          >
            {t('nav.logout')}
          </Button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
