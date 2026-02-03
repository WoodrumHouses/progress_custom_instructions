import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import { arrowLeftIcon } from '@progress/kendo-svg-icons';
import { projectService } from '../../services/projectService';
import { assetService } from '../../services/assetService';
import './ProjectDetail.css';

function ProjectDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });

  const { data: assets = [] } = useQuery({
    queryKey: ['assets', id],
    queryFn: () => assetService.getAll(id),
    enabled: !!id,
  });

  if (projectLoading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  return (
    <div className="project-detail" data-testid="project-detail-container-id">
      <div className="project-detail-header">
        <Button
          fillMode="flat"
          svgIcon={arrowLeftIcon}
          onClick={() => navigate('/projects')}
          data-testid="back-to-projects-button-id"
        >
          Back to Projects
        </Button>
      </div>

      <Card className="project-info-card" data-testid="project-info-card-id">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="project-meta">
            <span className={`status-badge ${project.status}`}>
              {project.status}
            </span>
            <span className="project-date">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="project-description">
            {project.description || 'No description'}
          </p>
        </CardBody>
      </Card>

      <div className="assets-section">
        <h2>{t('assets.title')}</h2>
        <div className="assets-grid">
          {assets.map((asset) => (
            <Card 
              key={asset.id} 
              className="asset-card"
              data-testid={`asset-card-id-${asset.id}`}
            >
              <CardBody>
                <h4>{asset.name}</h4>
                <span className="asset-type">{asset.type}</span>
              </CardBody>
            </Card>
          ))}
          {assets.length === 0 && (
            <p className="no-data">{t('common.noData')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
