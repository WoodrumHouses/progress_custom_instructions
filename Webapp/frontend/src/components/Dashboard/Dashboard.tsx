import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { projectService } from '../../services/projectService';
import { assetService } from '../../services/assetService';
import './Dashboard.css';

function Dashboard() {
  const { t } = useTranslation();

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: () => assetService.getAll(),
  });

  return (
    <div className="dashboard" data-testid="dashboard-container-id">
      <h1 className="dashboard-title">{t('dashboard.title')}</h1>
      <p className="dashboard-welcome">{t('dashboard.welcome')}</p>

      <div className="dashboard-stats">
        <Card className="dashboard-stat-card" data-testid="stat-projects-card-id">
          <CardHeader>
            <CardTitle>{t('dashboard.totalProjects')}</CardTitle>
          </CardHeader>
          <CardBody>
            <span className="stat-number">{projects.length}</span>
          </CardBody>
        </Card>

        <Card className="dashboard-stat-card" data-testid="stat-assets-card-id">
          <CardHeader>
            <CardTitle>{t('dashboard.totalAssets')}</CardTitle>
          </CardHeader>
          <CardBody>
            <span className="stat-number">{assets.length}</span>
          </CardBody>
        </Card>
      </div>

      <div className="dashboard-recent">
        <h2>{t('dashboard.recentProjects')}</h2>
        <div className="recent-projects-list">
          {projects.slice(0, 5).map((project) => (
            <Card 
              key={project.id} 
              className="recent-project-card"
              data-testid={`recent-project-card-id-${project.id}`}
            >
              <CardBody>
                <h3>{project.name}</h3>
                <p>{project.description || 'No description'}</p>
              </CardBody>
            </Card>
          ))}
          {projects.length === 0 && (
            <p className="no-data">{t('common.noData')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
