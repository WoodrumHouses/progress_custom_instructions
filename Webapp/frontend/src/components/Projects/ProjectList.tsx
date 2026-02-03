import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { plusIcon, trashIcon, eyeIcon } from '@progress/kendo-svg-icons';
import { projectService, CreateProjectRequest, Project } from '../../services/projectService';
import './ProjectList.css';

function ProjectList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<CreateProjectRequest>({
    name: '',
    description: '',
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: projectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowCreateDialog(false);
      setNewProject({ name: '', description: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowDeleteDialog(false);
      setProjectToDelete(null);
    },
  });

  const handleCreate = () => {
    if (newProject.name.trim()) {
      createMutation.mutate(newProject);
    }
  };

  const handleDelete = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  const confirmDelete = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  if (isLoading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="project-list" data-testid="project-list-container-id">
      <div className="project-list-header">
        <h1>{t('projects.title')}</h1>
        <Button
          themeColor="primary"
          svgIcon={plusIcon}
          onClick={() => setShowCreateDialog(true)}
          data-testid="create-project-button-id"
        >
          {t('projects.newProject')}
        </Button>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            data-testid={`project-card-id-${project.id}`}
          >
            <div className="project-card-header">
              <h3>{project.name}</h3>
              <span className={`status-badge ${project.status}`}>
                {project.status}
              </span>
            </div>
            <p className="project-description">
              {project.description || 'No description'}
            </p>
            <div className="project-card-footer">
              <span className="project-date">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <div className="project-actions">
                <Button
                  fillMode="flat"
                  svgIcon={eyeIcon}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  data-testid={`project-view-button-id-${project.id}`}
                />
                <Button
                  fillMode="flat"
                  svgIcon={trashIcon}
                  onClick={() => confirmDelete(project)}
                  data-testid={`project-delete-button-id-${project.id}`}
                />
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="no-data">{t('common.noData')}</p>
        )}
      </div>

      {/* Create Project Dialog */}
      {showCreateDialog && (
        <Dialog 
          title={t('projects.newProject')} 
          onClose={() => setShowCreateDialog(false)}
          data-testid="create-project-dialog-id"
        >
          <div className="dialog-form">
            <div className="form-field">
              <label>{t('projects.name')}</label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.value || '' })}
                data-testid="project-name-input-id"
              />
            </div>
            <div className="form-field">
              <label>{t('projects.description')}</label>
              <TextArea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.value || '' })}
                rows={4}
                data-testid="project-description-input-id"
              />
            </div>
          </div>
          <DialogActionsBar>
            <Button onClick={() => setShowCreateDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              themeColor="primary"
              onClick={handleCreate}
              disabled={!newProject.name.trim()}
              data-testid="project-create-submit-button-id"
            >
              {t('common.create')}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <Dialog 
          title={t('common.delete')} 
          onClose={() => setShowDeleteDialog(false)}
          data-testid="delete-project-dialog-id"
        >
          <p>{t('projects.deleteConfirm')}</p>
          <DialogActionsBar>
            <Button onClick={() => setShowDeleteDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              themeColor="error"
              onClick={handleDelete}
              data-testid="project-delete-confirm-button-id"
            >
              {t('common.delete')}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}

export default ProjectList;
