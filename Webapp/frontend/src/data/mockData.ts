/**
 * Mock data for development and testing
 * This can be used when the backend is not available
 */

import { Project } from '../services/projectService';
import { Asset, AssetType } from '../services/assetService';

export const mockUsers = [
  {
    id: '1',
    email: 'admin@corticon.com',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: '2',
    email: 'john.doe@corticon.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: '3',
    email: 'jane.smith@corticon.com',
    firstName: 'Jane',
    lastName: 'Smith',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Insurance Underwriting Rules',
    description:
      'Business rules for automated insurance policy underwriting decisions. ' +
      'Includes risk assessment, premium calculation, and eligibility checks.',
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-02-01T14:22:00Z',
  },
  {
    id: 'proj-2',
    name: 'Loan Approval System',
    description:
      'Decision rules for loan application processing. Covers credit scoring, ' +
      'debt-to-income ratio analysis, and approval thresholds.',
    status: 'active',
    createdAt: '2025-01-10T09:15:00Z',
    updatedAt: '2025-01-28T11:45:00Z',
  },
  {
    id: 'proj-3',
    name: 'Healthcare Claims Processing',
    description:
      'Rules engine for processing medical claims. Validates coverage, ' +
      'calculates reimbursements, and flags potential fraud.',
    status: 'active',
    createdAt: '2025-01-05T08:00:00Z',
    updatedAt: '2025-01-30T16:30:00Z',
  },
  {
    id: 'proj-4',
    name: 'Retail Pricing Engine',
    description:
      'Dynamic pricing rules for e-commerce platform. Handles discounts, ' +
      'promotions, loyalty programs, and regional pricing.',
    status: 'draft',
    createdAt: '2025-01-20T13:45:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
  },
  {
    id: 'proj-5',
    name: 'Tax Calculation Rules',
    description:
      'Comprehensive tax calculation rules for multi-state compliance. ' +
      'Supports federal, state, and local tax jurisdictions.',
    status: 'active',
    createdAt: '2024-12-01T11:00:00Z',
    updatedAt: '2025-01-15T09:30:00Z',
  },
  {
    id: 'proj-6',
    name: 'Customer Segmentation',
    description:
      'Rules for categorizing customers based on behavior, purchase history, ' +
      'and engagement metrics for targeted marketing.',
    status: 'draft',
    createdAt: '2025-01-25T15:00:00Z',
    updatedAt: '2025-01-27T12:15:00Z',
  },
  {
    id: 'proj-7',
    name: 'Fraud Detection System',
    description:
      'Real-time fraud detection rules for financial transactions. ' +
      'Uses pattern matching and anomaly detection.',
    status: 'active',
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2025-02-02T08:45:00Z',
  },
  {
    id: 'proj-8',
    name: 'Legacy Migration Project',
    description:
      'Archived project containing migrated rules from legacy COBOL system. ' +
      'Kept for reference purposes.',
    status: 'archived',
    createdAt: '2024-06-01T09:00:00Z',
    updatedAt: '2024-09-15T17:00:00Z',
  },
];

export const mockAssets: Asset[] = [
  // Insurance Underwriting Rules assets
  {
    id: 'asset-1',
    name: 'RiskAssessment',
    description: 'Calculates risk score based on applicant profile',
    type: AssetType.RULESHEET,
    projectId: 'proj-1',
    createdAt: '2025-01-15T10:35:00Z',
    updatedAt: '2025-01-31T14:00:00Z',
  },
  {
    id: 'asset-2',
    name: 'PremiumCalculation',
    description: 'Determines premium based on risk and coverage',
    type: AssetType.RULESHEET,
    projectId: 'proj-1',
    createdAt: '2025-01-15T10:40:00Z',
    updatedAt: '2025-01-29T11:30:00Z',
  },
  {
    id: 'asset-3',
    name: 'EligibilityCheck',
    description: 'Validates applicant eligibility criteria',
    type: AssetType.RULESHEET,
    projectId: 'proj-1',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-28T16:45:00Z',
  },
  {
    id: 'asset-4',
    name: 'UnderwritingFlow',
    description: 'Main underwriting decision flow',
    type: AssetType.RULEFLOW,
    projectId: 'proj-1',
    createdAt: '2025-01-17T11:00:00Z',
    updatedAt: '2025-02-01T10:20:00Z',
  },
  {
    id: 'asset-5',
    name: 'InsuranceVocabulary',
    description: 'Insurance domain vocabulary definitions',
    type: AssetType.VOCABULARY,
    projectId: 'proj-1',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
  },
  // Loan Approval System assets
  {
    id: 'asset-6',
    name: 'CreditScoring',
    description: 'Credit score evaluation rules',
    type: AssetType.RULESHEET,
    projectId: 'proj-2',
    createdAt: '2025-01-10T09:20:00Z',
    updatedAt: '2025-01-26T13:15:00Z',
  },
  {
    id: 'asset-7',
    name: 'DebtToIncomeRatio',
    description: 'DTI calculation and thresholds',
    type: AssetType.RULESHEET,
    projectId: 'proj-2',
    createdAt: '2025-01-10T09:30:00Z',
    updatedAt: '2025-01-25T09:00:00Z',
  },
  {
    id: 'asset-8',
    name: 'LoanApprovalFlow',
    description: 'Complete loan approval workflow',
    type: AssetType.RULEFLOW,
    projectId: 'proj-2',
    createdAt: '2025-01-11T10:00:00Z',
    updatedAt: '2025-01-28T11:45:00Z',
  },
  {
    id: 'asset-9',
    name: 'LoanDecisionService',
    description: 'Exposed decision service for loan applications',
    type: AssetType.DECISIONSERVICE,
    projectId: 'proj-2',
    createdAt: '2025-01-12T14:00:00Z',
    updatedAt: '2025-01-27T16:30:00Z',
  },
  // Healthcare Claims Processing assets
  {
    id: 'asset-10',
    name: 'CoverageValidation',
    description: 'Validates insurance coverage for procedures',
    type: AssetType.RULESHEET,
    projectId: 'proj-3',
    createdAt: '2025-01-05T08:15:00Z',
    updatedAt: '2025-01-29T10:00:00Z',
  },
  {
    id: 'asset-11',
    name: 'ReimbursementCalculation',
    description: 'Calculates reimbursement amounts',
    type: AssetType.RULESHEET,
    projectId: 'proj-3',
    createdAt: '2025-01-05T08:30:00Z',
    updatedAt: '2025-01-28T14:20:00Z',
  },
  {
    id: 'asset-12',
    name: 'FraudDetection',
    description: 'Identifies potential fraudulent claims',
    type: AssetType.RULESHEET,
    projectId: 'proj-3',
    createdAt: '2025-01-06T09:00:00Z',
    updatedAt: '2025-01-30T16:30:00Z',
  },
  {
    id: 'asset-13',
    name: 'ClaimsProcessingFlow',
    description: 'End-to-end claims processing workflow',
    type: AssetType.RULEFLOW,
    projectId: 'proj-3',
    createdAt: '2025-01-07T11:00:00Z',
    updatedAt: '2025-01-30T12:00:00Z',
  },
  // Fraud Detection System assets
  {
    id: 'asset-14',
    name: 'PatternMatching',
    description: 'Fraud pattern matching rules',
    type: AssetType.RULESHEET,
    projectId: 'proj-7',
    createdAt: '2024-11-15T10:15:00Z',
    updatedAt: '2025-02-01T09:30:00Z',
  },
  {
    id: 'asset-15',
    name: 'AnomalyDetection',
    description: 'Statistical anomaly detection',
    type: AssetType.RULESHEET,
    projectId: 'proj-7',
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2025-01-31T11:15:00Z',
  },
  {
    id: 'asset-16',
    name: 'RiskScoring',
    description: 'Transaction risk scoring',
    type: AssetType.RULESHEET,
    projectId: 'proj-7',
    createdAt: '2024-11-16T09:00:00Z',
    updatedAt: '2025-02-02T08:45:00Z',
  },
];

// Helper functions for mock data
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find((p) => p.id === id);
};

export const getAssetsByProjectId = (projectId: string): Asset[] => {
  return mockAssets.filter((a) => a.projectId === projectId);
};

export const getAssetById = (id: string): Asset | undefined => {
  return mockAssets.find((a) => a.id === id);
};

// Statistics for dashboard
export const mockStats = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter((p) => p.status === 'active').length,
  draftProjects: mockProjects.filter((p) => p.status === 'draft').length,
  archivedProjects: mockProjects.filter((p) => p.status === 'archived').length,
  totalAssets: mockAssets.length,
  assetsByType: {
    rulesheet: mockAssets.filter((a) => a.type === AssetType.RULESHEET).length,
    ruleflow: mockAssets.filter((a) => a.type === AssetType.RULEFLOW).length,
    vocabulary: mockAssets.filter((a) => a.type === AssetType.VOCABULARY).length,
    decisionservice: mockAssets.filter((a) => a.type === AssetType.DECISIONSERVICE)
      .length,
  },
};
