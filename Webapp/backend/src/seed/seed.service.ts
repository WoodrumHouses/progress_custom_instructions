import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Asset, AssetType } from '../assets/asset.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  async seedAll(): Promise<{ users: number; projects: number; assets: number }> {
    const users = await this.seedUsers();
    const projects = await this.seedProjects();
    const assets = await this.seedAssets();

    return {
      users: users.length,
      projects: projects.length,
      assets: assets.length,
    };
  }

  async seedUsers(): Promise<User[]> {
    const existingUsers = await this.usersRepository.count();
    if (existingUsers > 0) {
      this.logger.log('Users already exist, skipping seed');
      return [];
    }

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        email: 'admin@corticon.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
      },
      {
        email: 'john.doe@corticon.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      },
      {
        email: 'jane.smith@corticon.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        isActive: true,
      },
      {
        email: 'developer@corticon.com',
        password: hashedPassword,
        firstName: 'Dev',
        lastName: 'Eloper',
        isActive: true,
      },
    ];

    const createdUsers = await this.usersRepository.save(
      users.map((u) => this.usersRepository.create(u)),
    );

    this.logger.log(`Seeded ${createdUsers.length} users`);
    return createdUsers;
  }

  async seedProjects(): Promise<Project[]> {
    const existingProjects = await this.projectsRepository.count();
    if (existingProjects > 0) {
      this.logger.log('Projects already exist, skipping seed');
      return [];
    }

    const projects = [
      {
        name: 'Insurance Underwriting Rules',
        description:
          'Business rules for automated insurance policy underwriting decisions. ' +
          'Includes risk assessment, premium calculation, and eligibility checks.',
        status: 'active',
      },
      {
        name: 'Loan Approval System',
        description:
          'Decision rules for loan application processing. Covers credit scoring, ' +
          'debt-to-income ratio analysis, and approval thresholds.',
        status: 'active',
      },
      {
        name: 'Healthcare Claims Processing',
        description:
          'Rules engine for processing medical claims. Validates coverage, ' +
          'calculates reimbursements, and flags potential fraud.',
        status: 'active',
      },
      {
        name: 'Retail Pricing Engine',
        description:
          'Dynamic pricing rules for e-commerce platform. Handles discounts, ' +
          'promotions, loyalty programs, and regional pricing.',
        status: 'draft',
      },
      {
        name: 'Tax Calculation Rules',
        description:
          'Comprehensive tax calculation rules for multi-state compliance. ' +
          'Supports federal, state, and local tax jurisdictions.',
        status: 'active',
      },
      {
        name: 'Customer Segmentation',
        description:
          'Rules for categorizing customers based on behavior, purchase history, ' +
          'and engagement metrics for targeted marketing.',
        status: 'draft',
      },
      {
        name: 'Fraud Detection System',
        description:
          'Real-time fraud detection rules for financial transactions. ' +
          'Uses pattern matching and anomaly detection.',
        status: 'active',
      },
      {
        name: 'Legacy Migration Project',
        description:
          'Archived project containing migrated rules from legacy COBOL system. ' +
          'Kept for reference purposes.',
        status: 'archived',
      },
    ];

    const createdProjects = await this.projectsRepository.save(
      projects.map((p) => this.projectsRepository.create(p)),
    );

    this.logger.log(`Seeded ${createdProjects.length} projects`);
    return createdProjects;
  }

  async seedAssets(): Promise<Asset[]> {
    const existingAssets = await this.assetsRepository.count();
    if (existingAssets > 0) {
      this.logger.log('Assets already exist, skipping seed');
      return [];
    }

    const projects = await this.projectsRepository.find();
    if (projects.length === 0) {
      this.logger.warn('No projects found, cannot seed assets');
      return [];
    }

    const assetTemplates = [
      // Insurance Underwriting Rules assets
      {
        projectIndex: 0,
        assets: [
          {
            name: 'RiskAssessment',
            type: AssetType.RULESHEET,
            description: 'Calculates risk score based on applicant profile',
            content: this.generateRulesheetContent('RiskAssessment'),
          },
          {
            name: 'PremiumCalculation',
            type: AssetType.RULESHEET,
            description: 'Determines premium based on risk and coverage',
            content: this.generateRulesheetContent('PremiumCalculation'),
          },
          {
            name: 'EligibilityCheck',
            type: AssetType.RULESHEET,
            description: 'Validates applicant eligibility criteria',
            content: this.generateRulesheetContent('EligibilityCheck'),
          },
          {
            name: 'UnderwritingFlow',
            type: AssetType.RULEFLOW,
            description: 'Main underwriting decision flow',
            content: this.generateRuleflowContent('UnderwritingFlow'),
          },
          {
            name: 'InsuranceVocabulary',
            type: AssetType.VOCABULARY,
            description: 'Insurance domain vocabulary definitions',
            content: this.generateVocabularyContent('Insurance'),
          },
        ],
      },
      // Loan Approval System assets
      {
        projectIndex: 1,
        assets: [
          {
            name: 'CreditScoring',
            type: AssetType.RULESHEET,
            description: 'Credit score evaluation rules',
            content: this.generateRulesheetContent('CreditScoring'),
          },
          {
            name: 'DebtToIncomeRatio',
            type: AssetType.RULESHEET,
            description: 'DTI calculation and thresholds',
            content: this.generateRulesheetContent('DebtToIncomeRatio'),
          },
          {
            name: 'LoanApprovalFlow',
            type: AssetType.RULEFLOW,
            description: 'Complete loan approval workflow',
            content: this.generateRuleflowContent('LoanApprovalFlow'),
          },
          {
            name: 'LoanDecisionService',
            type: AssetType.DECISIONSERVICE,
            description: 'Exposed decision service for loan applications',
            content: this.generateDecisionServiceContent('LoanDecision'),
          },
        ],
      },
      // Healthcare Claims Processing assets
      {
        projectIndex: 2,
        assets: [
          {
            name: 'CoverageValidation',
            type: AssetType.RULESHEET,
            description: 'Validates insurance coverage for procedures',
            content: this.generateRulesheetContent('CoverageValidation'),
          },
          {
            name: 'ReimbursementCalculation',
            type: AssetType.RULESHEET,
            description: 'Calculates reimbursement amounts',
            content: this.generateRulesheetContent('ReimbursementCalculation'),
          },
          {
            name: 'FraudDetection',
            type: AssetType.RULESHEET,
            description: 'Identifies potential fraudulent claims',
            content: this.generateRulesheetContent('FraudDetection'),
          },
          {
            name: 'ClaimsProcessingFlow',
            type: AssetType.RULEFLOW,
            description: 'End-to-end claims processing workflow',
            content: this.generateRuleflowContent('ClaimsProcessingFlow'),
          },
          {
            name: 'HealthcareVocabulary',
            type: AssetType.VOCABULARY,
            description: 'Healthcare domain vocabulary',
            content: this.generateVocabularyContent('Healthcare'),
          },
        ],
      },
      // Retail Pricing Engine assets
      {
        projectIndex: 3,
        assets: [
          {
            name: 'BasePrice',
            type: AssetType.RULESHEET,
            description: 'Base pricing rules',
            content: this.generateRulesheetContent('BasePrice'),
          },
          {
            name: 'DiscountRules',
            type: AssetType.RULESHEET,
            description: 'Discount calculation rules',
            content: this.generateRulesheetContent('DiscountRules'),
          },
          {
            name: 'LoyaltyProgram',
            type: AssetType.RULESHEET,
            description: 'Loyalty points and rewards rules',
            content: this.generateRulesheetContent('LoyaltyProgram'),
          },
        ],
      },
      // Tax Calculation Rules assets
      {
        projectIndex: 4,
        assets: [
          {
            name: 'FederalTax',
            type: AssetType.RULESHEET,
            description: 'Federal tax calculation rules',
            content: this.generateRulesheetContent('FederalTax'),
          },
          {
            name: 'StateTax',
            type: AssetType.RULESHEET,
            description: 'State-specific tax rules',
            content: this.generateRulesheetContent('StateTax'),
          },
          {
            name: 'TaxCalculationService',
            type: AssetType.DECISIONSERVICE,
            description: 'Tax calculation decision service',
            content: this.generateDecisionServiceContent('TaxCalculation'),
          },
        ],
      },
      // Customer Segmentation assets
      {
        projectIndex: 5,
        assets: [
          {
            name: 'BehaviorAnalysis',
            type: AssetType.RULESHEET,
            description: 'Customer behavior analysis rules',
            content: this.generateRulesheetContent('BehaviorAnalysis'),
          },
          {
            name: 'SegmentAssignment',
            type: AssetType.RULESHEET,
            description: 'Segment assignment rules',
            content: this.generateRulesheetContent('SegmentAssignment'),
          },
        ],
      },
      // Fraud Detection System assets
      {
        projectIndex: 6,
        assets: [
          {
            name: 'PatternMatching',
            type: AssetType.RULESHEET,
            description: 'Fraud pattern matching rules',
            content: this.generateRulesheetContent('PatternMatching'),
          },
          {
            name: 'AnomalyDetection',
            type: AssetType.RULESHEET,
            description: 'Statistical anomaly detection',
            content: this.generateRulesheetContent('AnomalyDetection'),
          },
          {
            name: 'RiskScoring',
            type: AssetType.RULESHEET,
            description: 'Transaction risk scoring',
            content: this.generateRulesheetContent('RiskScoring'),
          },
          {
            name: 'FraudDetectionFlow',
            type: AssetType.RULEFLOW,
            description: 'Real-time fraud detection flow',
            content: this.generateRuleflowContent('FraudDetectionFlow'),
          },
        ],
      },
    ];

    const assetsToCreate: Partial<Asset>[] = [];

    for (const template of assetTemplates) {
      if (template.projectIndex < projects.length) {
        const project = projects[template.projectIndex];
        for (const asset of template.assets) {
          assetsToCreate.push({
            ...asset,
            projectId: project.id,
          });
        }
      }
    }

    const createdAssets = await this.assetsRepository.save(
      assetsToCreate.map((a) => this.assetsRepository.create(a)),
    );

    this.logger.log(`Seeded ${createdAssets.length} assets`);
    return createdAssets;
  }

  async clearAll(): Promise<void> {
    await this.assetsRepository.createQueryBuilder().delete().execute();
    await this.projectsRepository.createQueryBuilder().delete().execute();
    await this.usersRepository.createQueryBuilder().delete().execute();
    this.logger.log('Cleared all data');
  }

  private generateRulesheetContent(name: string): string {
    return JSON.stringify(
      {
        name,
        version: '1.0.0',
        rules: [
          {
            id: 1,
            condition: `${name}.input.value >= threshold`,
            action: `${name}.output.result = 'APPROVED'`,
            priority: 1,
          },
          {
            id: 2,
            condition: `${name}.input.value < threshold`,
            action: `${name}.output.result = 'REVIEW'`,
            priority: 2,
          },
          {
            id: 3,
            condition: `${name}.input.value < minimumThreshold`,
            action: `${name}.output.result = 'REJECTED'`,
            priority: 3,
          },
        ],
        metadata: {
          createdAt: new Date().toISOString(),
          author: 'System',
        },
      },
      null,
      2,
    );
  }

  private generateRuleflowContent(name: string): string {
    return JSON.stringify(
      {
        name,
        version: '1.0.0',
        nodes: [
          { id: 'start', type: 'start', position: { x: 100, y: 100 } },
          {
            id: 'validate',
            type: 'rulesheet',
            name: 'Validation',
            position: { x: 250, y: 100 },
          },
          {
            id: 'process',
            type: 'rulesheet',
            name: 'Processing',
            position: { x: 400, y: 100 },
          },
          {
            id: 'decision',
            type: 'decision',
            name: 'Decision Point',
            position: { x: 550, y: 100 },
          },
          { id: 'end', type: 'end', position: { x: 700, y: 100 } },
        ],
        connections: [
          { from: 'start', to: 'validate' },
          { from: 'validate', to: 'process' },
          { from: 'process', to: 'decision' },
          { from: 'decision', to: 'end' },
        ],
        metadata: {
          createdAt: new Date().toISOString(),
          author: 'System',
        },
      },
      null,
      2,
    );
  }

  private generateVocabularyContent(domain: string): string {
    const vocabularies: Record<string, object> = {
      Insurance: {
        entities: [
          {
            name: 'Policy',
            attributes: [
              { name: 'policyNumber', type: 'String' },
              { name: 'premium', type: 'Decimal' },
              { name: 'coverageAmount', type: 'Decimal' },
              { name: 'effectiveDate', type: 'Date' },
              { name: 'expirationDate', type: 'Date' },
            ],
          },
          {
            name: 'Applicant',
            attributes: [
              { name: 'age', type: 'Integer' },
              { name: 'riskScore', type: 'Integer' },
              { name: 'hasPreExistingCondition', type: 'Boolean' },
            ],
          },
          {
            name: 'Claim',
            attributes: [
              { name: 'claimId', type: 'String' },
              { name: 'amount', type: 'Decimal' },
              { name: 'status', type: 'String' },
            ],
          },
        ],
      },
      Healthcare: {
        entities: [
          {
            name: 'Patient',
            attributes: [
              { name: 'patientId', type: 'String' },
              { name: 'dateOfBirth', type: 'Date' },
              { name: 'insuranceId', type: 'String' },
            ],
          },
          {
            name: 'Procedure',
            attributes: [
              { name: 'procedureCode', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'cost', type: 'Decimal' },
            ],
          },
          {
            name: 'Claim',
            attributes: [
              { name: 'claimNumber', type: 'String' },
              { name: 'submittedAmount', type: 'Decimal' },
              { name: 'approvedAmount', type: 'Decimal' },
              { name: 'status', type: 'String' },
            ],
          },
        ],
      },
    };

    return JSON.stringify(
      {
        domain,
        version: '1.0.0',
        ...vocabularies[domain],
        metadata: {
          createdAt: new Date().toISOString(),
          author: 'System',
        },
      },
      null,
      2,
    );
  }

  private generateDecisionServiceContent(name: string): string {
    return JSON.stringify(
      {
        name,
        version: '1.0.0',
        endpoint: `/api/decision/${name.toLowerCase()}`,
        input: {
          type: 'object',
          properties: {
            requestId: { type: 'string' },
            data: { type: 'object' },
          },
        },
        output: {
          type: 'object',
          properties: {
            decision: { type: 'string' },
            score: { type: 'number' },
            reasons: { type: 'array', items: { type: 'string' } },
          },
        },
        ruleflow: `${name}Flow`,
        metadata: {
          createdAt: new Date().toISOString(),
          author: 'System',
        },
      },
      null,
      2,
    );
  }
}
